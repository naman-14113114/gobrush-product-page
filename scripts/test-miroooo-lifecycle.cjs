const { test } = require('node:test');
const assert = require('node:assert/strict');
const { normaliseItem, VARIANTS, secretMatches, processLifecycle } = require('../lib/miroooo-lifecycle');
const { buildTemplates, buildFlows } = require('./miroooo-email-system.cjs');

test('all eight variants resolve to their own model, colour and heads', () => {
  for (const [id, [product, colour]] of Object.entries(VARIANTS)) {
    const item = normaliseItem({ variant_id: id, product_id: product, quantity: 2 });
    assert.equal(item.ProductID, product);
    assert.equal(item.VariantName, colour);
    assert.equal(item.Quantity, 2);
    assert.ok(item.HeadsURL.endsWith(item.Model.toLowerCase() + '-heads'));
  }
  assert.notEqual(normaliseItem({variant_id:'1000020700958564'}).ImageURL, normaliseItem({variant_id:'1000020700182883'}).ImageURL);
});
test('unknown products and conflicting variants fail closed', () => {
  assert.equal(normaliseItem({variant_id:'unknown', product_id:'1000000675072187'}), null);
  assert.equal(normaliseItem({variant_id:'1000020700182883', product_id:'1000000675113473'}), null);
});
test('webhooks require the exact nonempty secret', () => {
  assert.equal(secretMatches('', ''), false);
  assert.equal(secretMatches('a', 'ab'), false);
  assert.equal(secretMatches('wrong', 'right'), false);
  assert.equal(secretMatches('correct', 'correct'), true);
});
test('templates and flows preserve email safety and model boundaries', () => {
  const templates = buildTemplates();
  assert.equal(templates.length, 27);
  for (const t of templates) { assert.ok(t.html.includes('{% unsubscribe')); assert.ok(!t.html.includes('<script')); }
  assert.ok(templates.find(t=>t.key==='checkout-3').html.includes('MIROOOO10'));
  for (const model of ['X1','X2']) {
    const t = templates.find(t=>t.key==='heads-stock-'+model);
    assert.ok(t.html.includes('/products/miroooo-'+model.toLowerCase()+'-heads'));
    assert.ok(!t.html.includes('/products/miroooo-'+(model==='X1'?'x2':'x1')+'-heads'));
  }
  const flows = buildFlows(Object.fromEntries(templates.map(t=>[t.key,'test-id'])), 'test-secret');
  assert.equal(flows.length,19);
  for (const f of flows) for (const action of f.definition.actions) if(action.data.status) assert.equal(action.data.status,'draft');
});
test('checkout verifier checks ownership, purchase, consent and idempotency before event creation', async () => {
  const originalFetch = global.fetch;
  const originalKey = process.env.MIROOOO_KLAVIYO_API_KEY;
  process.env.MIROOOO_KLAVIYO_API_KEY = 'test-only';
  let checkout = {info:{email:'buyer@example.com',buyer_accepts_marketing:true,is_completed:false}, items:[{variant_id:'1000020700182883',qty:1}],total:{already_paid:0},order:null,token:{checkout:'structured-api-token'}};
  let consent = 'NEVER_SUBSCRIBED', canReceive = true, purchased = false, posted = [], completedToken = null;
  global.fetch = async (url, opts = {}) => {
    let data;
    if (url.includes('/profiles/')) {
      const profile={id:'profile-test',attributes:{properties:{miroooo_recovery_completed_checkout:completedToken},subscriptions:{email:{marketing:{consent,can_receive_email_marketing:canReceive,suppression:[],list_suppressions:[]}}}}};
      data={data:url.includes('/profiles/profile-test/')?profile:[profile]};
    }
    else if (url.includes('/next/new-info.json')) data={code:200,result:checkout};
    else if (url.includes('/events/') && opts.method==='POST') {posted.push(JSON.parse(opts.body)); return new Response(null,{status:202});}
    else if(url.includes('/events/')) data={data:purchased?[{id:'purchase'}]:[]};
    else throw new Error('Unexpected endpoint '+url);
    return new Response(JSON.stringify(data),{status:200});
  };
  const body={kind:'checkout',stage:1,email:'buyer@example.com',checkout_url:'https://miroooo.us/checkouts/'+'a'.repeat(32),dry_run:true};
  try {
    assert.equal((await processLifecycle(body)).status,'eligible');
    assert.equal(posted.length,0);
    checkout.info.email='someone-else@example.com'; assert.equal((await processLifecycle(body)).status,'checkout_owner_mismatch');
    checkout.info.email=body.email; checkout.info.is_completed=true; assert.equal((await processLifecycle(body)).status,'already_completed');
    checkout.info.is_completed=false; checkout.info.buyer_accepts_marketing=false; assert.equal((await processLifecycle(body)).status,'no_marketing_consent');
    checkout.info.buyer_accepts_marketing=true; purchased=true; assert.equal((await processLifecycle(body)).status,'recent_purchase');
    purchased=false; consent='UNSUBSCRIBED'; assert.equal((await processLifecycle(body)).status,'suppressed');
    consent='NEVER_SUBSCRIBED'; assert.equal((await processLifecycle({...body,checkout_url:'https://evil.example/checkouts/'+'a'.repeat(32)})).status,'invalid_checkout');
    for(let i=0;i<2;i++) assert.equal((await processLifecycle({...body,dry_run:false})).status,'event_accepted');
    assert.equal(posted[0].data.attributes.unique_id,posted[1].data.attributes.unique_id);
    assert.equal(posted[0].data.attributes.properties.Items[0].Model,'X2');
    assert.equal(posted[0].data.attributes.properties.HasX1,false);
    completedToken='a'.repeat(32);
    assert.equal((await processLifecycle(body)).status,'recovery_already_completed');
  } finally {global.fetch=originalFetch; if(originalKey===undefined) delete process.env.MIROOOO_KLAVIYO_API_KEY; else process.env.MIROOOO_KLAVIYO_API_KEY=originalKey;}
});
test('Klaviyo AND-of-OR groups admit exactly one recovery stage and the right owner model', () => {
  const templates=buildTemplates();
  const flows=buildFlows(Object.fromEntries(templates.map(t=>[t.key,'test-id'])),'test-secret');
  const evaluate=(filter, event)=>filter.condition_groups.every(group=>group.conditions.some(c=>c.filter.operator==='contains'?event[c.field]?.includes(c.filter.value):event[c.field]===c.filter.value));
  const recoveries=flows.filter(f=>f.name.includes('Checkout email'));
  for(const stage of [1,2,3]) {
    assert.deepEqual(recoveries.map(f=>evaluate(f.definition.triggers[0].trigger_filter,{Verified:true,Stage:stage})),[1,2,3].map(s=>s===stage));
    assert.deepEqual(recoveries.map(f=>evaluate(f.definition.triggers[0].trigger_filter,{Verified:false,Stage:stage})),[false,false,false]);
  }
  const heads=flows.filter(f=>f.name.includes('Head care and replenishment'));
  assert.deepEqual(heads.map(f=>evaluate(f.definition.triggers[0].trigger_filter,{Verified:true,HasX1:true,HasX2:false})),[true,false]);
  assert.deepEqual(heads.map(f=>evaluate(f.definition.triggers[0].trigger_filter,{Verified:true,HasX1:false,HasX2:true})),[false,true]);
  const checkout=flows.find(f=>f.name.includes('Checkout validation'));
  assert.equal(evaluate(checkout.definition.triggers[0].trigger_filter,{ItemNames:['Brush X2']}),true);
  assert.equal(evaluate(checkout.definition.triggers[0].trigger_filter,{ItemNames:['Unrelated brand']}),false);
  for(const f of flows) for(const group of f.definition.profile_filter.condition_groups) assert.equal(group.conditions.length,1,'Every safety prerequisite must be ANDed: '+f.name);
});
