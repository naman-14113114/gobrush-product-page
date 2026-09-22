import assert from "node:assert";
import { createXpageCartCheckout, mapCartToXpageVariants, XPAGE_MIROOOO_VARIANTS } from "../lib/xpage-checkout.js";
import handler from "../api/checkout/prepare.js";

console.log("--- TEST 1: Variant Mapping ---");
const testLines = [
  { productId: "miroooo-x", color: "Pink", quantity: 1 },
  { productId: "miroooo-x", color: "Grey", quantity: 2 },
  { productId: "miroooo-x", color: "Silver", quantity: 1 },
  { productId: "miroooo-x1-heads", color: "Heads", quantity: 3 },
];

const mapped = mapCartToXpageVariants(testLines);
console.log("Mapped lines:", mapped);

assert.strictEqual(mapped.find(i => i.variant_id === XPAGE_MIROOOO_VARIANTS.pink)?.quantity, 1);
assert.strictEqual(mapped.find(i => i.variant_id === XPAGE_MIROOOO_VARIANTS.grey)?.quantity, 2);
assert.strictEqual(mapped.find(i => i.variant_id === XPAGE_MIROOOO_VARIANTS.silver)?.quantity, 1);
assert.strictEqual(mapped.find(i => i.variant_id === XPAGE_MIROOOO_VARIANTS.heads)?.quantity, 3);
console.log("✓ Variant mapping passed!");

console.log("\n--- TEST 2: Live XPage Session Creation (Single Brush + MIROOOO10) ---");
const session1 = await createXpageCartCheckout({
  cart: [
    { color: "Pink", quantity: 1 },
    { productId: "miroooo-x1-heads", quantity: 1 }
  ],
  discountCode: "MIROOOO10",
  attribution: { utm_source: "bing", msclkid: "test-msclkid-123" },
  currency: "GBP"
});

console.log("Single brush checkout URL:", session1.checkoutUrl);
assert.ok(session1.ok);
assert.ok(session1.checkoutUrl.includes("8e9c584880e3.myxpage.shop"));
assert.ok(session1.checkoutUrl.includes("discount=MIROOOO10"));
console.log("✓ Single brush + MIROOOO10 passed!");

console.log("\n--- TEST 3: Live XPage Session Creation (Buy 2 Brushes + 2-BRUSH-BUNDLE-SPECIAL + FREE2HEADS) ---");
const session2 = await createXpageCartCheckout({
  cart: [
    { color: "Silver", quantity: 1 },
    { color: "Grey", quantity: 1 },
    { productId: "miroooo-x1-heads", quantity: 1 }
  ],
  discountCode: "2-BRUSH-BUNDLE-SPECIAL",
  attribution: { utm_source: "google" },
  currency: "GBP"
});

console.log("Buy 2 checkout URL:", session2.checkoutUrl);
assert.ok(session2.ok);
assert.ok(session2.checkoutUrl.includes("8e9c584880e3.myxpage.shop"));
assert.ok(session2.checkoutUrl.includes("discount=2-BRUSH-BUNDLE-SPECIAL"));
console.log("✓ Buy 2 session passed!");

console.log("\n--- TEST 4: Live XPage Session Creation (Buy 3 Brushes + 3-BRUSH-BUNDLE-OFFER + FREE4HEADS) ---");
const session3 = await createXpageCartCheckout({
  cart: [
    { color: "Pink", quantity: 1 },
    { color: "Silver", quantity: 1 },
    { color: "Grey", quantity: 1 },
    { productId: "miroooo-x1-heads", quantity: 2 }
  ],
  discountCode: "3-BRUSH-BUNDLE-OFFER",
  attribution: { utm_source: "bing" },
  currency: "GBP"
});

console.log("Buy 3 checkout URL:", session3.checkoutUrl);
assert.ok(session3.ok);
assert.ok(session3.checkoutUrl.includes("8e9c584880e3.myxpage.shop"));
assert.ok(session3.checkoutUrl.includes("discount=3-BRUSH-BUNDLE-OFFER"));
console.log("✓ Buy 3 session passed!");

console.log("\n--- TEST 5: Morocco IP Blocker in prepare.js ---");
let moroccoStatus = 0;
let moroccoBody = null;

const mockResMorocco = {
  setHeader: () => {},
  status: (code) => {
    moroccoStatus = code;
    return {
      json: (data) => {
        moroccoBody = data;
      }
    };
  }
};

const mockReqMorocco = {
  method: "POST",
  headers: {
    "x-vercel-ip-country": "MA"
  },
  body: {
    items: [{ color: "Pink", quantity: 1 }]
  }
};

await handler(mockReqMorocco, mockResMorocco);
console.log("Morocco response status:", moroccoStatus);
console.log("Morocco response body:", moroccoBody);

assert.strictEqual(moroccoStatus, 400);
assert.strictEqual(moroccoBody.error, "The checkout has not been connected, and no order has been placed.");
console.log("✓ Morocco IP blocker passed!");

console.log("\n>>> ALL TESTS COMPLETED SUCCESSFULLY! <<<");
