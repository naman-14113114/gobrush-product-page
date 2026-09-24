import assert from "node:assert/strict";
import { test } from "node:test";
import { detectBundlePayload, mapCartToXpageVariants, XPAGE_BUNDLES, XPAGE_VARIANTS } from "../lib/xpage-checkout.js";
import handler from "../api/checkout/prepare.js";

const brush = (product, color, quantity = 1) => ({ productHandle: `miroooo-${product}`, color, quantity });
const gift = (product, quantity) => ({ id: `miroooo-${product}-heads:free`, productHandle: `miroooo-${product}-heads`, quantity });

test("X1 and X2 Buy 2 send the selected colours and one free matching head set", () => {
  for (const product of ["x1", "x2"]) {
    const cart = [brush(product, "Pink"), brush(product, "Silver"), gift(product, 1)];
    const bundle = detectBundlePayload(cart);
    assert.equal(bundle.bundle_option_id, XPAGE_BUNDLES[product].buy2.optionId);
    assert.deepEqual(bundle.bundle_selected_variants.conditions[XPAGE_BUNDLES[product].buy2.conditionId],
      [XPAGE_VARIANTS[`${product}_pink`], XPAGE_VARIANTS[`${product}_silver`]]);
    assert.deepEqual(bundle.bundle_selected_variants.offered[XPAGE_BUNDLES[product].buy2.offeredId],
      [XPAGE_VARIANTS[`${product}_heads`]]);
  }
});

test("Buy 3 preserves three colours and gives exactly two head sets", () => {
  const bundle = detectBundlePayload([
    brush("x2", "Pink"), brush("x2", "Grey"), brush("x2", "Silver"), gift("x2", 2),
  ]);
  assert.equal(bundle.bundle_option_id, XPAGE_BUNDLES.x2.buy3.optionId);
  assert.equal(bundle.bundle_selected_variants.conditions[XPAGE_BUNDLES.x2.buy3.conditionId].length, 3);
  assert.equal(bundle.bundle_selected_variants.offered[XPAGE_BUNDLES.x2.buy3.offeredId].length, 2);
});

test("a displayed free gift is not misclassified as an extra brush", () => {
  const cart = [brush("x2", "Pink", 2), gift("x2", 1)];
  assert.equal(detectBundlePayload(cart).bundle_option_id, XPAGE_BUNDLES.x2.buy2.optionId);
  assert.equal(mapCartToXpageVariants(cart).find((item) => item.variant_id === XPAGE_VARIANTS.x2_heads).quantity, 1);
});

test("unknown products, invalid quantity, and incorrect gifts stop checkout", () => {
  assert.throws(() => mapCartToXpageVariants([{ productHandle: "unknown", quantity: 1 }]));
  assert.throws(() => mapCartToXpageVariants([brush("x1", "Silver", 0)]));
  assert.throws(() => detectBundlePayload([brush("x2", "Pink", 2), gift("x1", 1)]));
  assert.throws(() => detectBundlePayload([brush("x2", "Pink", 2), gift("x2", 2)]));
});

test("the prepare endpoint refuses an unverified legacy manual coupon", async () => {
  let status, body;
  const response = {
    setHeader() {},
    status(code) { status = code; return this; },
    json(value) { body = value; return this; },
  };
  await handler({ method: "POST", headers: {}, body: {
    items: [brush("x2", "Silver")], discountCode: "MIROOOO10",
  } }, response);
  assert.equal(status, 409);
  assert.match(body.error, /not been verified on XPageDrop/);
});
