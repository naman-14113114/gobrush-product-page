import assert from "node:assert";
import { createXpageCartCheckout, mapCartToXpageVariants, XPAGE_VARIANTS, XPAGE_MIROOOO_VARIANTS } from "../lib/xpage-checkout.js";
import handler from "../api/checkout/prepare.js";

console.log("--- TEST 1: Miroooo X1 & X2 Variant Mapping ---");
const testLines = [
  // Miroooo X1
  { productId: "miroooo-x", color: "Pink", quantity: 1 },
  { productId: "miroooo-x", color: "Grey", quantity: 2 },
  { productId: "miroooo-x", color: "Silver", quantity: 1 },
  { productId: "miroooo-x1-heads", color: "Heads", quantity: 3 },
  { id: "miroooo-x1-heads:Default", productHandle: "miroooo-x1-heads", productId: "1000000675471182", variantId: "1000020710139724", title: "Miroooo X1 Heads", color: "Default", quantity: 2 },
  { productId: "1000000675471182", variantId: "1000020710139724", color: "Default", quantity: 1 },

  // Miroooo X2
  { productId: "miroooo-x2", color: "Pink", quantity: 1 },
  { productId: "miroooo-x2", color: "Grey", quantity: 1 },
  { productId: "miroooo-x2", color: "Silver", quantity: 2 },
  { productId: "miroooo-x2-heads", color: "Default", quantity: 3 },
  { id: "miroooo-x2-heads:Default", productHandle: "miroooo-x2-heads", productId: "1000000675616058", variantId: "1000020718937117", title: "Miroooo X2 Heads", color: "Default", quantity: 2 },
  { productId: "1000000675616058", variantId: "1000020718937117", color: "Default", quantity: 1 },
];

const mapped = mapCartToXpageVariants(testLines);
console.log("Mapped lines:", mapped);

// Verify X1 mappings
assert.strictEqual(mapped.find(i => i.variant_id === XPAGE_VARIANTS.x1_pink)?.quantity, 1);
assert.strictEqual(mapped.find(i => i.variant_id === XPAGE_VARIANTS.x1_grey)?.quantity, 2);
assert.strictEqual(mapped.find(i => i.variant_id === XPAGE_VARIANTS.x1_silver)?.quantity, 1);
assert.strictEqual(mapped.find(i => i.variant_id === XPAGE_VARIANTS.x1_heads)?.quantity, 6); // 3 + 2 + 1

// Verify X2 mappings
assert.strictEqual(mapped.find(i => i.variant_id === XPAGE_VARIANTS.x2_pink)?.quantity, 1);
assert.strictEqual(mapped.find(i => i.variant_id === XPAGE_VARIANTS.x2_grey)?.quantity, 1);
assert.strictEqual(mapped.find(i => i.variant_id === XPAGE_VARIANTS.x2_silver)?.quantity, 2);
assert.strictEqual(mapped.find(i => i.variant_id === XPAGE_VARIANTS.x2_heads)?.quantity, 6); // 3 + 2 + 1
console.log("✓ Variant mapping for X1 and X2 passed!");

console.log("\n--- TEST 2A: Standalone Miroooo X1 Heads Live XPage Session ---");
const sessionX1Heads = await createXpageCartCheckout({
  cart: [
    {
      id: "miroooo-x1-heads:Default",
      productHandle: "miroooo-x1-heads",
      productId: "1000000675471182",
      variantId: "1000020710139724",
      title: "Miroooo X1 Heads",
      color: "Default",
      quantity: 2
    }
  ],
  discountCode: "MIROOOO10",
  attribution: { utm_source: "google" },
  currency: "GBP"
});

console.log("Standalone X1 heads checkout URL:", sessionX1Heads.checkoutUrl);
console.log("Standalone X1 heads cart payload:", sessionX1Heads.cart);
assert.ok(sessionX1Heads.ok);
assert.strictEqual(sessionX1Heads.cart.length, 1);
assert.strictEqual(sessionX1Heads.cart[0].variant_id, XPAGE_VARIANTS.x1_heads);
assert.strictEqual(sessionX1Heads.cart[0].quantity, 2);
console.log("✓ Standalone Miroooo X1 Heads session passed!");

console.log("\n--- TEST 2B: Standalone Miroooo X2 Heads Live XPage Session ---");
const sessionX2Heads = await createXpageCartCheckout({
  cart: [
    {
      id: "miroooo-x2-heads:Default",
      productHandle: "miroooo-x2-heads",
      productId: "1000000675616058",
      variantId: "1000020718937117",
      title: "Miroooo X2 Heads",
      color: "Default",
      quantity: 2
    }
  ],
  discountCode: "MIROOOO10",
  attribution: { utm_source: "google" },
  currency: "GBP"
});

console.log("Standalone X2 heads checkout URL:", sessionX2Heads.checkoutUrl);
console.log("Standalone X2 heads cart payload:", sessionX2Heads.cart);
assert.ok(sessionX2Heads.ok);
assert.strictEqual(sessionX2Heads.cart.length, 1);
assert.strictEqual(sessionX2Heads.cart[0].variant_id, XPAGE_VARIANTS.x2_heads);
assert.strictEqual(sessionX2Heads.cart[0].quantity, 2);
console.log("✓ Standalone Miroooo X2 Heads session passed!");

console.log("\n--- TEST 3: Miroooo X2 Buy 1 + MIROOOO10 Live XPage Session ---");
const sessionX2Single = await createXpageCartCheckout({
  cart: [
    {
      id: "miroooo-x2:Silver",
      productHandle: "miroooo-x2",
      productId: "1000000675072187",
      variantId: "1000020700182884",
      title: "Miroooo X2",
      color: "Silver",
      quantity: 1
    }
  ],
  discountCode: "MIROOOO10",
  attribution: { utm_source: "bing", msclkid: "msclkid-x2-test" },
  currency: "GBP"
});

console.log("Miroooo X2 Buy 1 checkout URL:", sessionX2Single.checkoutUrl);
console.log("Miroooo X2 Buy 1 cart payload:", sessionX2Single.cart);
assert.ok(sessionX2Single.ok);
assert.ok(sessionX2Single.checkoutUrl.includes("8e9c584880e3.myxpage.shop"));
assert.ok(sessionX2Single.checkoutUrl.includes("discount=MIROOOO10"));
assert.strictEqual(sessionX2Single.cart[0].variant_id, XPAGE_VARIANTS.x2_silver);
console.log("✓ Miroooo X2 Buy 1 + MIROOOO10 passed!");

console.log("\n--- TEST 4: Miroooo X2 Buy 2 (+ 2-BRUSH-BUNDLE-SPECIAL + 1 Free Miroooo X2 Heads set) Live Session ---");
const sessionX2Buy2 = await createXpageCartCheckout({
  cart: [
    {
      id: "miroooo-x2:Pink",
      productHandle: "miroooo-x2",
      productId: "1000000675072187",
      variantId: "1000020700182882",
      title: "Miroooo X2",
      color: "Pink",
      quantity: 1
    },
    {
      id: "miroooo-x2:Silver",
      productHandle: "miroooo-x2",
      productId: "1000000675072187",
      variantId: "1000020700182884",
      title: "Miroooo X2",
      color: "Silver",
      quantity: 1
    },
    {
      id: "miroooo-x2-heads:free",
      productHandle: "miroooo-x2-heads",
      productId: "1000000675616058",
      variantId: "1000020718937117",
      title: "Miroooo X2 Heads",
      color: "Heads",
      quantity: 1
    }
  ],
  discountCode: "2-BRUSH-BUNDLE-SPECIAL",
  attribution: { utm_source: "google" },
  currency: "GBP"
});

console.log("Miroooo X2 Buy 2 checkout URL:", sessionX2Buy2.checkoutUrl);
console.log("Miroooo X2 Buy 2 cart payload:", sessionX2Buy2.cart);
assert.ok(sessionX2Buy2.ok);
assert.ok(sessionX2Buy2.checkoutUrl.includes("8e9c584880e3.myxpage.shop"));
assert.ok(sessionX2Buy2.checkoutUrl.includes("discount=2-BRUSH-BUNDLE-SPECIAL"));
assert.strictEqual(sessionX2Buy2.cart.find(i => i.variant_id === XPAGE_VARIANTS.x2_pink)?.quantity, 1);
assert.strictEqual(sessionX2Buy2.cart.find(i => i.variant_id === XPAGE_VARIANTS.x2_silver)?.quantity, 1);
assert.strictEqual(sessionX2Buy2.cart.find(i => i.variant_id === XPAGE_VARIANTS.x2_heads)?.quantity, 1);
console.log("✓ Miroooo X2 Buy 2 session passed!");

console.log("\n--- TEST 5: Miroooo X2 Buy 3 (+ 3-BRUSH-BUNDLE-OFFER + 2 Free Miroooo X2 Heads sets) Live Session ---");
const sessionX2Buy3 = await createXpageCartCheckout({
  cart: [
    {
      id: "miroooo-x2:Pink",
      productHandle: "miroooo-x2",
      productId: "1000000675072187",
      variantId: "1000020700182882",
      title: "Miroooo X2",
      color: "Pink",
      quantity: 1
    },
    {
      id: "miroooo-x2:Grey",
      productHandle: "miroooo-x2",
      productId: "1000000675072187",
      variantId: "1000020700182883",
      title: "Miroooo X2",
      color: "Grey",
      quantity: 1
    },
    {
      id: "miroooo-x2:Silver",
      productHandle: "miroooo-x2",
      productId: "1000000675072187",
      variantId: "1000020700182884",
      title: "Miroooo X2",
      color: "Silver",
      quantity: 1
    },
    {
      id: "miroooo-x2-heads:free",
      productHandle: "miroooo-x2-heads",
      productId: "1000000675616058",
      variantId: "1000020718937117",
      title: "Miroooo X2 Heads",
      color: "Heads",
      quantity: 2
    }
  ],
  discountCode: "3-BRUSH-BUNDLE-OFFER",
  attribution: { utm_source: "bing" },
  currency: "GBP"
});

console.log("Miroooo X2 Buy 3 checkout URL:", sessionX2Buy3.checkoutUrl);
console.log("Miroooo X2 Buy 3 cart payload:", sessionX2Buy3.cart);
assert.ok(sessionX2Buy3.ok);
assert.ok(sessionX2Buy3.checkoutUrl.includes("8e9c584880e3.myxpage.shop"));
assert.ok(sessionX2Buy3.checkoutUrl.includes("discount=3-BRUSH-BUNDLE-OFFER"));
assert.strictEqual(sessionX2Buy3.cart.find(i => i.variant_id === XPAGE_VARIANTS.x2_pink)?.quantity, 1);
assert.strictEqual(sessionX2Buy3.cart.find(i => i.variant_id === XPAGE_VARIANTS.x2_grey)?.quantity, 1);
assert.strictEqual(sessionX2Buy3.cart.find(i => i.variant_id === XPAGE_VARIANTS.x2_silver)?.quantity, 1);
assert.strictEqual(sessionX2Buy3.cart.find(i => i.variant_id === XPAGE_VARIANTS.x2_heads)?.quantity, 2);
console.log("\n--- TEST 6: Miroooo X1 Buy 2 (+ 2-BRUSH-BUNDLE-SPECIAL + 1 Free Miroooo X1 Heads set) Live Session ---");
const sessionX1Buy2 = await createXpageCartCheckout({
  cart: [
    {
      id: "miroooo-x:Pink",
      productHandle: "miroooo-x",
      productId: "1000000675113473",
      variantId: "1000020700958562",
      title: "Miroooo X1",
      color: "Pink",
      quantity: 1
    },
    {
      id: "miroooo-x:Silver",
      productHandle: "miroooo-x",
      productId: "1000000675113473",
      variantId: "1000020700958563",
      title: "Miroooo X1",
      color: "Silver",
      quantity: 1
    },
    {
      id: "miroooo-x1-heads:free",
      productHandle: "miroooo-x1-heads",
      productId: "1000000675471182",
      variantId: "1000020710139724",
      title: "Miroooo X1 Heads",
      color: "Heads",
      quantity: 1
    }
  ],
  discountCode: "2-BRUSH-BUNDLE-SPECIAL",
  attribution: { utm_source: "google" },
  currency: "GBP"
});

console.log("Miroooo X1 Buy 2 checkout URL:", sessionX1Buy2.checkoutUrl);
console.log("Miroooo X1 Buy 2 cart payload:", sessionX1Buy2.cart);
assert.ok(sessionX1Buy2.ok);
assert.ok(sessionX1Buy2.checkoutUrl.includes("8e9c584880e3.myxpage.shop"));
assert.ok(sessionX1Buy2.checkoutUrl.includes("discount=2-BRUSH-BUNDLE-SPECIAL"));
assert.strictEqual(sessionX1Buy2.cart.find(i => i.variant_id === XPAGE_VARIANTS.x1_pink)?.quantity, 1);
assert.strictEqual(sessionX1Buy2.cart.find(i => i.variant_id === XPAGE_VARIANTS.x1_silver)?.quantity, 1);
assert.strictEqual(sessionX1Buy2.cart.find(i => i.variant_id === XPAGE_VARIANTS.x1_heads)?.quantity, 1);
console.log("✓ Miroooo X1 Buy 2 session passed!");

console.log("\n--- TEST 7: Miroooo X1 Buy 3 (+ 3-BRUSH-BUNDLE-OFFER + 2 Free Miroooo X1 Heads sets) Live Session ---");
const sessionX1Buy3 = await createXpageCartCheckout({
  cart: [
    {
      id: "miroooo-x:Pink",
      productHandle: "miroooo-x",
      productId: "1000000675113473",
      variantId: "1000020700958562",
      title: "Miroooo X1",
      color: "Pink",
      quantity: 1
    },
    {
      id: "miroooo-x:Grey",
      productHandle: "miroooo-x",
      productId: "1000000675113473",
      variantId: "1000020700958564",
      title: "Miroooo X1",
      color: "Grey",
      quantity: 1
    },
    {
      id: "miroooo-x:Silver",
      productHandle: "miroooo-x",
      productId: "1000000675113473",
      variantId: "1000020700958563",
      title: "Miroooo X1",
      color: "Silver",
      quantity: 1
    },
    {
      id: "miroooo-x1-heads:free",
      productHandle: "miroooo-x1-heads",
      productId: "1000000675471182",
      variantId: "1000020710139724",
      title: "Miroooo X1 Heads",
      color: "Heads",
      quantity: 2
    }
  ],
  discountCode: "3-BRUSH-BUNDLE-OFFER",
  attribution: { utm_source: "bing" },
  currency: "GBP"
});

console.log("Miroooo X1 Buy 3 checkout URL:", sessionX1Buy3.checkoutUrl);
console.log("Miroooo X1 Buy 3 cart payload:", sessionX1Buy3.cart);
assert.ok(sessionX1Buy3.ok);
assert.ok(sessionX1Buy3.checkoutUrl.includes("8e9c584880e3.myxpage.shop"));
assert.ok(sessionX1Buy3.checkoutUrl.includes("discount=3-BRUSH-BUNDLE-OFFER"));
assert.strictEqual(sessionX1Buy3.cart.find(i => i.variant_id === XPAGE_VARIANTS.x1_pink)?.quantity, 1);
assert.strictEqual(sessionX1Buy3.cart.find(i => i.variant_id === XPAGE_VARIANTS.x1_grey)?.quantity, 1);
assert.strictEqual(sessionX1Buy3.cart.find(i => i.variant_id === XPAGE_VARIANTS.x1_silver)?.quantity, 1);
assert.strictEqual(sessionX1Buy3.cart.find(i => i.variant_id === XPAGE_VARIANTS.x1_heads)?.quantity, 2);
console.log("✓ Miroooo X1 Buy 3 session passed!");

console.log("\n--- TEST 8: Morocco IP Blocker in prepare.js ---");
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
    items: [
      {
        id: "miroooo-x2:Pink",
        productHandle: "miroooo-x2",
        productId: "1000000675072187",
        variantId: "1000020700182882",
        title: "Miroooo X2",
        color: "Pink",
        quantity: 1
      }
    ]
  }
};

await handler(mockReqMorocco, mockResMorocco);
console.log("Morocco response status:", moroccoStatus);
console.log("Morocco response body:", moroccoBody);

assert.strictEqual(moroccoStatus, 400);
assert.strictEqual(moroccoBody.error, "The checkout has not been connected, and no order has been placed.");
console.log("✓ Morocco IP blocker passed!");

console.log("\n>>> ALL TESTS COMPLETED SUCCESSFULLY! <<<");
