import assert from "node:assert/strict";
import { test } from "node:test";
import { brandedCheckoutUrl, detectBundlePayload, mapCartToXpageVariants, XPAGE_BUNDLES, XPAGE_VARIANTS } from "../lib/xpage-checkout.js";
import { collectRequestedDiscountCode } from "../api/checkout/prepare.js";

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

test("unknown products and invalid quantities stop checkout; non-bundle combinations use the cart", () => {
  assert.throws(() => mapCartToXpageVariants([{ productHandle: "unknown", quantity: 1 }]));
  assert.throws(() => mapCartToXpageVariants([brush("x1", "Silver", 0)]));
  assert.equal(detectBundlePayload([brush("x2", "Pink", 2), gift("x1", 1)]), null);
  assert.equal(detectBundlePayload([brush("x2", "Pink", 2), gift("x2", 2)]), null);
  assert.equal(detectBundlePayload([brush("x2", "Pink", 2), {productHandle:"miroooo-x2-heads",quantity:1}]), null);
  assert.equal(detectBundlePayload([brush("x1", "Silver", 4), gift("x1", 3)]), null);
  assert.equal(mapCartToXpageVariants([brush("x1", "Silver", 101)])[0].quantity, 101);
  assert.equal(detectBundlePayload([brush("x1", "Silver", 1000000)]), null);
});

test("MIROOOO10 selects native discounted X1 and X2 tiers with matching free heads", () => {
  for (const product of ["x1", "x2"]) {
    for (const quantity of [1, 2, 3]) {
      const cart = [brush(product, "Pink", quantity)];
      const payload = detectBundlePayload(cart, "MIROOOO10");
      const option = XPAGE_BUNDLES[product][`promoBuy${quantity}`];
      assert.equal(payload.bundle_option_id, option.optionId);
      assert.equal(payload.bundle_selected_variants.conditions[option.conditionId].length, quantity);
      assert.equal(Object.values(payload.bundle_selected_variants.offered)[0]?.length || 0, quantity - 1);
      assert.equal(detectBundlePayload(cart, "MIROOOO").bundle_option_id, option.optionId);
    }
  }
});

test("provider checkout sessions are shown only on matching Miroooo domains", () => {
  const path = `/encoded-store/checkout/${"a".repeat(64)}`;
  const provider = `https://8e9c584880e3.myxpage.shop${path}`;
  assert.equal(brandedCheckoutUrl(provider, "x1"), `https://x1.miroooo.us${path}`);
  assert.equal(brandedCheckoutUrl(provider, "x2"), `https://offer.miroooo.us${path}`);
  assert.throws(() => brandedCheckoutUrl(`https://example.com${path}`, "x2"));
});

test("a saved manual coupon is selected for entry at ordinary checkout", () => {
  assert.equal(collectRequestedDiscountCode({ discountCode: "MIROOOO10" }), "MIROOOO10");
  assert.equal(collectRequestedDiscountCode({ discountCodes: ["FREE2HEADS", "MIROOOO10"] }), "MIROOOO10");
  assert.equal(collectRequestedDiscountCode({ discountCode: "FREE2HEADS" }), "");
});
