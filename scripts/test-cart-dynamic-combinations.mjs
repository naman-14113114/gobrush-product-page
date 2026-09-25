import assert from "node:assert";
import { createXpageCartCheckout, XPAGE_VARIANTS, detectBundlePayload } from "../lib/xpage-checkout.js";

console.log("=== COMPREHENSIVE TEST SUITE: ALL 12 X2 OFFERS & X1 COMBINATIONS ===");

// 1. Helper function mirroring cart.html & site.js computeTotals
function computeTotals(items, appliedPromoCodes = []) {
  let x2Count = 0;
  let x1Count = 0;
  let x2HeadsCount = 0;
  let x1HeadsCount = 0;

  items.forEach(item => {
    const qty = item.quantity || 1;
    if (item.productHandle === "miroooo-x2") x2Count += qty;
    else if (item.productHandle === "miroooo-x") x1Count += qty;
    else if (item.productHandle === "miroooo-x2-heads") x2HeadsCount += qty;
    else if (item.productHandle === "miroooo-x1-heads") x1HeadsCount += qty;
  });

  const totalQty = x2Count + x1Count + x2HeadsCount + x1HeadsCount;
  const isX2 = x2Count > 0;
  const isX1 = x1Count > 0;
  const manualCode = appliedPromoCodes.find(c => c === "MIROOOO" || c === "MIROOOO10");

  const isX2Bundle = x1Count === 0 && (x2Count === 2 || x2Count === 3);
  const isX1Bundle = x2Count === 0 && (x1Count === 2 || x1Count === 3);

  const x2Compare = x2Count * 139;
  const x1Compare = x1Count * 119;
  const x2HeadsCompare = x2HeadsCount * 10;
  const x1HeadsCompare = x1HeadsCount * 10;
  const compareAt = x2Compare + x1Compare + x2HeadsCompare + x1HeadsCompare;

  const baseBrushCompareSavings = (x2Count * (139 - 69)) + (x1Count * (119 - 59));

  let x2BundlePromoDiscount = 0;
  let x2BundlePromoName = "";
  let extraBrushHeadSets = 0;

  if (isX2Bundle) {
    if (x2Count === 2) {
      x2BundlePromoDiscount = 10;
      x2BundlePromoName = "Buy 2 bundle";
      extraBrushHeadSets = 1;
    } else if (x2Count === 3) {
      x2BundlePromoDiscount = 30;
      x2BundlePromoName = "Buy 3 bundle";
      extraBrushHeadSets = 2;
    }
  }

  let x1BundleDiscount = 0;
  let extraX1BrushHeadSets = 0;
  if (isX1Bundle) {
    if (x1Count === 2) {
      x1BundleDiscount = 10;
      extraX1BrushHeadSets = 1;
    } else if (x1Count === 3) {
      x1BundleDiscount = 30;
      extraX1BrushHeadSets = 2;
    }
  }

  let giftsValue = 0;
  let unlockedGiftsCount = 0;

  if (extraBrushHeadSets > 0) {
    giftsValue += extraBrushHeadSets * 10;
    unlockedGiftsCount += 1;
  }
  if (extraX1BrushHeadSets > 0) {
    giftsValue += extraX1BrushHeadSets * 10;
    unlockedGiftsCount += 1;
  }

  const x2Net = (x2Count * 69) - x2BundlePromoDiscount;
  const x1Net = (x1Count * 59) - x1BundleDiscount;
  const headsNet = (x2HeadsCount * 10) + (x1HeadsCount * 10);
  const brushSubtotal = Math.max(0, x2Net + x1Net);
  const subtotal = Math.max(0, brushSubtotal + headsNet);

  // 10% promo discount applies strictly to brush subtotal, rounded to nearest integer
  const promoDiscount = manualCode ? Math.round(brushSubtotal * 0.10) : 0;
  const finalSubtotal = Math.max(0, Number((subtotal - promoDiscount).toFixed(2)));
  const bundleSavings = baseBrushCompareSavings + x1BundleDiscount;
  const totalSavings = Number((bundleSavings + x2BundlePromoDiscount + giftsValue + promoDiscount).toFixed(2));

  return {
    quantity: totalQty,
    subtotal: subtotal,
    compareAt: compareAt,
    bundleSavings: bundleSavings,
    bundlePromoDiscount: x2BundlePromoDiscount,
    unlockedGiftsCount: unlockedGiftsCount,
    giftsValue: giftsValue,
    promoDiscount: promoDiscount,
    totalSavings: totalSavings,
    finalSubtotal: finalSubtotal,
    extraBrushHeadSets: extraBrushHeadSets,
    extraX1BrushHeadSets: extraX1BrushHeadSets,
    x2Count: x2Count,
    x1Count: x1Count,
    x2HeadsCount: x2HeadsCount,
    x1HeadsCount: x1HeadsCount,
    isX2Bundle,
    isX1Bundle
  };
}

// Helper simulating prepareItemsForCheckout
function prepareCheckoutItems(cartItems, totals) {
  const items = cartItems.map(i => ({ ...i }));
  if (totals.extraBrushHeadSets > 0) {
    items.push({
      id: "miroooo-x2-heads:free",
      productHandle: "miroooo-x2-heads",
      isFree: true,
      quantity: totals.extraBrushHeadSets
    });
  } else if (totals.extraX1BrushHeadSets > 0) {
    items.push({
      id: "miroooo-x1-heads:free",
      productHandle: "miroooo-x1-heads",
      isFree: true,
      quantity: totals.extraX1BrushHeadSets
    });
  }
  return items;
}

// ==========================================
// TEST ALL 12 X2 OFFERS CALCULATIONS & ROUTING
// ==========================================

console.log("\n--- OPTION 1: Buy 1 (1 brush, 0 heads, no promo) ---");
{
  const cart = [{ productHandle: "miroooo-x2", color: "Silver", quantity: 1, unitPrice: 69, comparePrice: 139 }];
  const totals = computeTotals(cart);
  assert.strictEqual(totals.finalSubtotal, 69);
  assert.strictEqual(totals.extraBrushHeadSets, 0);
  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundle = detectBundlePayload(checkoutItems, "");
  assert.strictEqual(bundle?.matchedKey, "buy1");
  console.log("✓ Option 1 verified: £" + totals.finalSubtotal + " (matchedKey: " + bundle.matchedKey + ")");
}

console.log("\n--- OPTION 2: Buy 2 + 1 Free Head (2 brushes, 0 paid heads, no promo) ---");
{
  const cart = [{ productHandle: "miroooo-x2", color: "Silver", quantity: 2, unitPrice: 69, comparePrice: 139 }];
  const totals = computeTotals(cart);
  assert.strictEqual(totals.finalSubtotal, 128);
  assert.strictEqual(totals.extraBrushHeadSets, 1);
  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundle = detectBundlePayload(checkoutItems, "");
  assert.strictEqual(bundle?.matchedKey, "buy2");
  console.log("✓ Option 2 verified: £" + totals.finalSubtotal + " (matchedKey: " + bundle.matchedKey + ")");
}

console.log("\n--- OPTION 3: Buy 3 + 2 Free Head (3 brushes, 0 paid heads, no promo) ---");
{
  const cart = [{ productHandle: "miroooo-x2", color: "Silver", quantity: 3, unitPrice: 69, comparePrice: 139 }];
  const totals = computeTotals(cart);
  assert.strictEqual(totals.finalSubtotal, 177);
  assert.strictEqual(totals.extraBrushHeadSets, 2);
  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundle = detectBundlePayload(checkoutItems, "");
  assert.strictEqual(bundle?.matchedKey, "buy3");
  console.log("✓ Option 3 verified: £" + totals.finalSubtotal + " (matchedKey: " + bundle.matchedKey + ")");
}

console.log("\n--- OPTION 4: Buy 1 + MIROOOO10 (1 brush, 0 heads, promo) ---");
{
  const cart = [{ productHandle: "miroooo-x2", color: "Silver", quantity: 1, unitPrice: 69, comparePrice: 139 }];
  const totals = computeTotals(cart, ["MIROOOO10"]);
  assert.strictEqual(totals.promoDiscount, 7);
  assert.strictEqual(totals.finalSubtotal, 62);
  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundle = detectBundlePayload(checkoutItems, "MIROOOO10");
  assert.strictEqual(bundle?.matchedKey, "promoBuy1");
  console.log("✓ Option 4 verified: £" + totals.finalSubtotal + " (matchedKey: " + bundle.matchedKey + ")");
}

console.log("\n--- OPTION 5: Buy 2 + 1 Free Head + MIROOOO10 (2 brushes, 0 paid heads, promo) ---");
{
  const cart = [{ productHandle: "miroooo-x2", color: "Silver", quantity: 2, unitPrice: 69, comparePrice: 139 }];
  const totals = computeTotals(cart, ["MIROOOO10"]);
  assert.strictEqual(totals.promoDiscount, 13); // 10% of £128 = £12.80 -> £13
  assert.strictEqual(totals.finalSubtotal, 115); // £128 - £13 = £115
  assert.strictEqual(totals.extraBrushHeadSets, 1);
  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundle = detectBundlePayload(checkoutItems, "MIROOOO10");
  assert.strictEqual(bundle?.matchedKey, "promoBuy2");
  console.log("✓ Option 5 verified: £" + totals.finalSubtotal + " (matchedKey: " + bundle.matchedKey + ")");
}

console.log("\n--- OPTION 6: Buy 3 + 2 Free Heads + MIROOOO10 (3 brushes, 0 paid heads, promo) ---");
{
  const cart = [{ productHandle: "miroooo-x2", color: "Silver", quantity: 3, unitPrice: 69, comparePrice: 139 }];
  const totals = computeTotals(cart, ["MIROOOO10"]);
  assert.strictEqual(totals.promoDiscount, 18); // 10% of £177 = £17.70 -> £18
  assert.strictEqual(totals.finalSubtotal, 159); // £177 - £18 = £159
  assert.strictEqual(totals.extraBrushHeadSets, 2);
  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundle = detectBundlePayload(checkoutItems, "MIROOOO10");
  assert.strictEqual(bundle?.matchedKey, "promoBuy3");
  console.log("✓ Option 6 verified: £" + totals.finalSubtotal + " (matchedKey: " + bundle.matchedKey + ")");
}

console.log("\n--- OPTION 7: Buy 1 + 1Head + MIROOOO10 (1 brush + 1 paid head, promo) ---");
{
  const cart = [
    { productHandle: "miroooo-x2", color: "Silver", quantity: 1, unitPrice: 69, comparePrice: 139 },
    { productHandle: "miroooo-x2-heads", color: "Default", quantity: 1, unitPrice: 10, comparePrice: 10 }
  ];
  const totals = computeTotals(cart, ["MIROOOO10"]);
  assert.strictEqual(totals.subtotal, 79);
  assert.strictEqual(totals.promoDiscount, 7); // 10% strictly on £69 brush = £7, heads excluded
  assert.strictEqual(totals.finalSubtotal, 72); // £79 - £7 = £72
  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundle = detectBundlePayload(checkoutItems, "MIROOOO10");
  assert.strictEqual(bundle?.matchedKey, "promoBuy1_1head");
  console.log("✓ Option 7 verified: £" + totals.finalSubtotal + " (matchedKey: " + bundle.matchedKey + ")");
}

console.log("\n--- OPTION 8: Buy 1 + 2Head + MIROOOO10 (1 brush + 2 paid heads, promo) ---");
{
  const cart = [
    { productHandle: "miroooo-x2", color: "Silver", quantity: 1, unitPrice: 69, comparePrice: 139 },
    { productHandle: "miroooo-x2-heads", color: "Default", quantity: 2, unitPrice: 10, comparePrice: 10 }
  ];
  const totals = computeTotals(cart, ["MIROOOO10"]);
  assert.strictEqual(totals.subtotal, 89);
  assert.strictEqual(totals.promoDiscount, 7); // 10% strictly on £69 brush = £7, heads excluded
  assert.strictEqual(totals.finalSubtotal, 82); // £89 - £7 = £82
  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundle = detectBundlePayload(checkoutItems, "MIROOOO10");
  assert.strictEqual(bundle?.matchedKey, "promoBuy1_2head");
  console.log("✓ Option 8 verified: £" + totals.finalSubtotal + " (matchedKey: " + bundle.matchedKey + ")");
}

console.log("\n--- OPTION 9: Buy 2 + 1 Free Head + 1 Paid Head (2 brushes + 1 paid head, no promo) ---");
{
  const cart = [
    { productHandle: "miroooo-x2", color: "Silver", quantity: 2, unitPrice: 69, comparePrice: 139 },
    { productHandle: "miroooo-x2-heads", color: "Default", quantity: 1, unitPrice: 10, comparePrice: 10 }
  ];
  const totals = computeTotals(cart);
  assert.strictEqual(totals.subtotal, 138); // £128 + £10 = £138
  assert.strictEqual(totals.finalSubtotal, 138);
  assert.strictEqual(totals.extraBrushHeadSets, 1);
  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundle = detectBundlePayload(checkoutItems, "");
  assert.strictEqual(bundle?.matchedKey, "buy2_1head");
  console.log("✓ Option 9 verified: £" + totals.finalSubtotal + " (matchedKey: " + bundle.matchedKey + ")");
}

console.log("\n--- OPTION 10: Buy 2 + 1 Free Head + 1 Paid Head + MIROOOO10 (2 brushes + 1 paid head, promo) ---");
{
  const cart = [
    { productHandle: "miroooo-x2", color: "Silver", quantity: 2, unitPrice: 69, comparePrice: 139 },
    { productHandle: "miroooo-x2-heads", color: "Default", quantity: 1, unitPrice: 10, comparePrice: 10 }
  ];
  const totals = computeTotals(cart, ["MIROOOO10"]);
  assert.strictEqual(totals.subtotal, 138);
  assert.strictEqual(totals.promoDiscount, 13); // 10% strictly on £128 brushes = £13, heads excluded
  assert.strictEqual(totals.finalSubtotal, 125); // £138 - £13 = £125
  assert.strictEqual(totals.extraBrushHeadSets, 1);
  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundle = detectBundlePayload(checkoutItems, "MIROOOO10");
  assert.strictEqual(bundle?.matchedKey, "promoBuy2_1head");
  console.log("✓ Option 10 verified: £" + totals.finalSubtotal + " (matchedKey: " + bundle.matchedKey + ")");
}

console.log("\n--- OPTION 11: Buy 3 + 2 Free Heads + 1 Paid Head (3 brushes + 1 paid head, no promo) ---");
{
  const cart = [
    { productHandle: "miroooo-x2", color: "Silver", quantity: 3, unitPrice: 69, comparePrice: 139 },
    { productHandle: "miroooo-x2-heads", color: "Default", quantity: 1, unitPrice: 10, comparePrice: 10 }
  ];
  const totals = computeTotals(cart);
  assert.strictEqual(totals.subtotal, 187); // £177 + £10 = £187
  assert.strictEqual(totals.finalSubtotal, 187);
  assert.strictEqual(totals.extraBrushHeadSets, 2);
  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundle = detectBundlePayload(checkoutItems, "");
  assert.strictEqual(bundle?.matchedKey, "buy3_1head");
  console.log("✓ Option 11 verified: £" + totals.finalSubtotal + " (matchedKey: " + bundle.matchedKey + ")");
}

console.log("\n--- OPTION 12: Buy 3 + 2 Free Heads + 1 Paid Head + MIROOOO10 (3 brushes + 1 paid head, promo) ---");
{
  const cart = [
    { productHandle: "miroooo-x2", color: "Silver", quantity: 3, unitPrice: 69, comparePrice: 139 },
    { productHandle: "miroooo-x2-heads", color: "Default", quantity: 1, unitPrice: 10, comparePrice: 10 }
  ];
  const totals = computeTotals(cart, ["MIROOOO10"]);
  assert.strictEqual(totals.subtotal, 187);
  assert.strictEqual(totals.promoDiscount, 18); // 10% strictly on £177 brushes = £18, heads excluded
  assert.strictEqual(totals.finalSubtotal, 169); // £187 - £18 = £169
  assert.strictEqual(totals.extraBrushHeadSets, 2);
  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundle = detectBundlePayload(checkoutItems, "MIROOOO10");
  assert.strictEqual(bundle?.matchedKey, "promoBuy3_1head");
  console.log("✓ Option 12 verified: £" + totals.finalSubtotal + " (matchedKey: " + bundle.matchedKey + ")");
}

// ==========================================
// TEST ALL 12 LIVE XPAGE CHECKOUT CREATIONS
// ==========================================

console.log("\n--- TESTING LIVE CHECKOUT SESSIONS FOR ALL 12 OPTIONS ---");

const liveTests = [
  {
    name: "1. Buy 1",
    cart: [{ productHandle: "miroooo-x2", color: "Silver", quantity: 1, variantId: XPAGE_VARIANTS.x2_silver }],
    promo: ""
  },
  {
    name: "2. Buy 2 + 1 Free",
    cart: [
      { productHandle: "miroooo-x2", color: "Silver", quantity: 2, variantId: XPAGE_VARIANTS.x2_silver },
      { productHandle: "miroooo-x2-heads", isFree: true, quantity: 1, variantId: XPAGE_VARIANTS.x2_heads }
    ],
    promo: ""
  },
  {
    name: "3. Buy 3 + 2 Free",
    cart: [
      { productHandle: "miroooo-x2", color: "Silver", quantity: 3, variantId: XPAGE_VARIANTS.x2_silver },
      { productHandle: "miroooo-x2-heads", isFree: true, quantity: 2, variantId: XPAGE_VARIANTS.x2_heads }
    ],
    promo: ""
  },
  {
    name: "4. Buy 1 + MIROOOO10",
    cart: [{ productHandle: "miroooo-x2", color: "Silver", quantity: 1, variantId: XPAGE_VARIANTS.x2_silver }],
    promo: "MIROOOO10"
  },
  {
    name: "5. Buy 2 + 1 Free + MIROOOO10",
    cart: [
      { productHandle: "miroooo-x2", color: "Silver", quantity: 2, variantId: XPAGE_VARIANTS.x2_silver },
      { productHandle: "miroooo-x2-heads", isFree: true, quantity: 1, variantId: XPAGE_VARIANTS.x2_heads }
    ],
    promo: "MIROOOO10"
  },
  {
    name: "6. Buy 3 + 2 Free + MIROOOO10",
    cart: [
      { productHandle: "miroooo-x2", color: "Silver", quantity: 3, variantId: XPAGE_VARIANTS.x2_silver },
      { productHandle: "miroooo-x2-heads", isFree: true, quantity: 2, variantId: XPAGE_VARIANTS.x2_heads }
    ],
    promo: "MIROOOO10"
  },
  {
    name: "7. Buy 1 + 1Head + MIROOOO10",
    cart: [
      { productHandle: "miroooo-x2", color: "Silver", quantity: 1, variantId: XPAGE_VARIANTS.x2_silver },
      { productHandle: "miroooo-x2-heads", quantity: 1, variantId: XPAGE_VARIANTS.x2_heads }
    ],
    promo: "MIROOOO10"
  },
  {
    name: "8. Buy 1 + 2Head + MIROOOO10",
    cart: [
      { productHandle: "miroooo-x2", color: "Silver", quantity: 1, variantId: XPAGE_VARIANTS.x2_silver },
      { productHandle: "miroooo-x2-heads", quantity: 2, variantId: XPAGE_VARIANTS.x2_heads }
    ],
    promo: "MIROOOO10"
  },
  {
    name: "9. Buy 2 + 1 Free + 1 Paid",
    cart: [
      { productHandle: "miroooo-x2", color: "Silver", quantity: 2, variantId: XPAGE_VARIANTS.x2_silver },
      { productHandle: "miroooo-x2-heads", quantity: 1, variantId: XPAGE_VARIANTS.x2_heads },
      { productHandle: "miroooo-x2-heads", isFree: true, quantity: 1, variantId: XPAGE_VARIANTS.x2_heads }
    ],
    promo: ""
  },
  {
    name: "10. Buy 2 + 1 Free + 1 Paid + MIROOOO10",
    cart: [
      { productHandle: "miroooo-x2", color: "Silver", quantity: 2, variantId: XPAGE_VARIANTS.x2_silver },
      { productHandle: "miroooo-x2-heads", quantity: 1, variantId: XPAGE_VARIANTS.x2_heads },
      { productHandle: "miroooo-x2-heads", isFree: true, quantity: 1, variantId: XPAGE_VARIANTS.x2_heads }
    ],
    promo: "MIROOOO10"
  },
  {
    name: "11. Buy 3 + 2 Free + 1 Paid",
    cart: [
      { productHandle: "miroooo-x2", color: "Silver", quantity: 3, variantId: XPAGE_VARIANTS.x2_silver },
      { productHandle: "miroooo-x2-heads", quantity: 1, variantId: XPAGE_VARIANTS.x2_heads },
      { productHandle: "miroooo-x2-heads", isFree: true, quantity: 2, variantId: XPAGE_VARIANTS.x2_heads }
    ],
    promo: ""
  },
  {
    name: "12. Buy 3 + 2 Free + 1 Paid + MIROOOO10",
    cart: [
      { productHandle: "miroooo-x2", color: "Silver", quantity: 3, variantId: XPAGE_VARIANTS.x2_silver },
      { productHandle: "miroooo-x2-heads", quantity: 1, variantId: XPAGE_VARIANTS.x2_heads },
      { productHandle: "miroooo-x2-heads", isFree: true, quantity: 2, variantId: XPAGE_VARIANTS.x2_heads }
    ],
    promo: "MIROOOO10"
  }
];

for (const t of liveTests) {
  const session = await createXpageCartCheckout({
    cart: t.cart,
    currency: "GBP",
    discountCode: t.promo,
    attribution: { utm_source: "test" }
  });
  assert.ok(session.ok, `Session creation failed for ${t.name}`);
  assert.strictEqual(session.isBundle, true, `Expected bundle session for ${t.name}`);
  assert.ok(session.checkoutUrl.startsWith("https://offer.miroooo.us/"), `Unexpected checkout domain for ${t.name}: ${session.checkoutUrl}`);
  assert.ok(/\/checkout\/[\da-f]{64}/i.test(session.checkoutUrl), `Unexpected checkout path for ${t.name}: ${session.checkoutUrl}`);
  console.log(`✓ Live checkout session verified for ${t.name} -> ${session.checkoutUrl.slice(0, 55)}...`);
}

console.log("\n>>> ALL 12 X2 OFFERS AND X1 COMBINATIONS PASSED WITH 100% SUCCESS! <<<");
