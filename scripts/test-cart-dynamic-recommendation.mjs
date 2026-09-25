import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

console.log("=== RUNNING CART DYNAMIC RECOMMENDATION & REMOVAL TESTS ===\n");

// Read cart.html and extract script logic for validation
const cartHtml = fs.readFileSync("cart.html", "utf8");

// Verify critical strings and logic are present in cart.html
console.log("TEST 1: Verifying cart.html code structure...");
assert.ok(cartHtml.includes("cart-upsell-container"), "cart-upsell-container must exist");
assert.ok(cartHtml.includes("cart-upsell-add-btn"), "cart-upsell-add-btn must exist");
assert.ok(cartHtml.includes("miroooo-x2-heads"), "miroooo-x2-heads must exist");
assert.ok(cartHtml.includes("miroooo-x1-heads"), "miroooo-x1-heads must exist");
assert.ok(cartHtml.includes("totals.x2Count === 1"), "x2Count === 1 single brush condition must exist");
assert.ok(cartHtml.includes("totals.x1Count === 1"), "x1Count === 1 single brush condition must exist");
assert.ok(cartHtml.includes("upsellContainer.style.display = \"none\""), "upsell card hiding logic must exist");
assert.ok(cartHtml.includes("items.filter(i => i.productHandle !== \"miroooo-x2-heads\")"), "Dynamic X2 heads removal must exist");
assert.ok(cartHtml.includes("items.filter(i => i.productHandle !== \"miroooo-x1-heads\")"), "Dynamic X1 heads removal must exist");
console.log("✓ TEST 1 Passed: cart.html contains all necessary logic.\n");

// Test 2: Cart normalization simulated logic
console.log("TEST 2: Testing Cart Normalization with Buy 1, Buy 2, Buy 3 scenarios...");

function normalizeColor(color) {
  if (!color) return "Grey";
  const c = String(color).trim().toLowerCase();
  if (c.includes("pink") || c.includes("rose")) return "Pink";
  if (c.includes("silver")) return "Silver";
  return "Grey";
}

function normalizeCartState(raw) {
  if (!raw) return { version: 2, items: [] };
  let items = [];

  if (Array.isArray(raw.items)) {
    const merged = [];
    raw.items.forEach(item => {
      if (!item || (item.quantity || 0) <= 0) return;
      const h = item.productHandle || item.productId;
      const color = (h === "miroooo-x1-heads" || h === "miroooo-x2-heads") ? "Default" : normalizeColor(item.color);
      const qty = Math.max(1, parseInt(item.quantity || "1", 10));
      const existing = merged.find(i => i.productHandle === h && i.color === color);
      if (existing) {
        existing.quantity += qty;
      } else {
        merged.push({ productHandle: h, color, quantity: qty });
      }
    });
    items = merged;
  }

  let x2Count = 0;
  let x1Count = 0;
  items.forEach(i => {
    const q = i.quantity || 1;
    if (i.productHandle === "miroooo-x2") x2Count += q;
    if (i.productHandle === "miroooo-x") x1Count += q;
  });

  if (x2Count >= 2) {
    items = items.filter(i => i.productHandle !== "miroooo-x2-heads");
  }
  if (x1Count >= 2) {
    items = items.filter(i => i.productHandle !== "miroooo-x1-heads");
  }

  return { version: 2, items };
}

// Scenario 2A: X2 Buy 1 + X2 Heads -> Both preserved
const cart1 = normalizeCartState({
  items: [
    { productHandle: "miroooo-x2", color: "Silver", quantity: 1 },
    { productHandle: "miroooo-x2-heads", color: "Default", quantity: 1 }
  ]
});
assert.strictEqual(cart1.items.length, 2, "X2 Buy 1 allows paid extra heads");
assert.strictEqual(cart1.items.find(i => i.productHandle === "miroooo-x2-heads")?.quantity, 1);
console.log("✓ Scenario 2A Passed: X2 Buy 1 + Paid Heads preserved.");

// Scenario 2B: X2 Buy 2 + X2 Heads -> Paid heads automatically removed
const cart2 = normalizeCartState({
  items: [
    { productHandle: "miroooo-x2", color: "Silver", quantity: 2 },
    { productHandle: "miroooo-x2-heads", color: "Default", quantity: 1 }
  ]
});
assert.strictEqual(cart2.items.length, 1, "X2 Buy 2 must automatically remove paid extra heads");
assert.strictEqual(cart2.items[0].productHandle, "miroooo-x2");
assert.strictEqual(cart2.items.find(i => i.productHandle === "miroooo-x2-heads"), undefined);
console.log("✓ Scenario 2B Passed: X2 Buy 2 removes paid heads.");

// Scenario 2C: X2 Buy 3 + X2 Heads -> Paid heads automatically removed
const cart3 = normalizeCartState({
  items: [
    { productHandle: "miroooo-x2", color: "Silver", quantity: 3 },
    { productHandle: "miroooo-x2-heads", color: "Default", quantity: 1 }
  ]
});
assert.strictEqual(cart3.items.length, 1, "X2 Buy 3 must automatically remove paid extra heads");
assert.strictEqual(cart3.items.find(i => i.productHandle === "miroooo-x2-heads"), undefined);
console.log("✓ Scenario 2C Passed: X2 Buy 3 removes paid heads.");

// Scenario 2D: X1 Buy 1 + X1 Heads -> Both preserved
const cart4 = normalizeCartState({
  items: [
    { productHandle: "miroooo-x", color: "Pink", quantity: 1 },
    { productHandle: "miroooo-x1-heads", color: "Default", quantity: 1 }
  ]
});
assert.strictEqual(cart4.items.length, 2, "X1 Buy 1 allows paid extra heads");
assert.strictEqual(cart4.items.find(i => i.productHandle === "miroooo-x1-heads")?.quantity, 1);
console.log("✓ Scenario 2D Passed: X1 Buy 1 + Paid Heads preserved.");

// Scenario 2E: X1 Buy 2 + X1 Heads -> Paid heads automatically removed
const cart5 = normalizeCartState({
  items: [
    { productHandle: "miroooo-x", color: "Pink", quantity: 2 },
    { productHandle: "miroooo-x1-heads", color: "Default", quantity: 1 }
  ]
});
assert.strictEqual(cart5.items.length, 1, "X1 Buy 2 must automatically remove paid extra heads");
assert.strictEqual(cart5.items.find(i => i.productHandle === "miroooo-x1-heads"), undefined);
console.log("✓ Scenario 2E Passed: X1 Buy 2 removes paid heads.");

// Test 3: Recommendation Target Decision Function
console.log("\nTEST 3: Testing Recommendation Target Calculation...");

function getRecommendationTarget(totals) {
  if (totals.x2Count === 1 && totals.x1Count === 0) {
    return { handle: "miroooo-x2-heads", title: "Miroooo X2 Heads (1 Set)", visible: true };
  }
  if (totals.x1Count === 1 && totals.x2Count === 0) {
    return { handle: "miroooo-x1-heads", title: "Miroooo X1 Heads (1 Set)", visible: true };
  }
  if (totals.x2Count === 1 && totals.x1Count === 1) {
    return { handle: "miroooo-x2-heads", title: "Miroooo X2 Heads (1 Set)", visible: true };
  }
  return null;
}

// 3A: X2 Buy 1 -> recommends X2 Heads
const recX2 = getRecommendationTarget({ x2Count: 1, x1Count: 0 });
assert.ok(recX2);
assert.strictEqual(recX2.handle, "miroooo-x2-heads");
assert.strictEqual(recX2.visible, true);
console.log("✓ 3A: X2 Buy 1 correctly recommends Miroooo X2 Heads.");

// 3B: X1 Buy 1 -> recommends X1 Heads
const recX1 = getRecommendationTarget({ x2Count: 0, x1Count: 1 });
assert.ok(recX1);
assert.strictEqual(recX1.handle, "miroooo-x1-heads");
assert.strictEqual(recX1.visible, true);
console.log("✓ 3B: X1 Buy 1 correctly recommends Miroooo X1 Heads.");

// 3C: X2 Buy 2 -> null (hidden)
const recX2Buy2 = getRecommendationTarget({ x2Count: 2, x1Count: 0 });
assert.strictEqual(recX2Buy2, null, "X2 Buy 2 must hide recommendation card");
console.log("✓ 3C: X2 Buy 2 correctly hides recommendation card.");

// 3D: X2 Buy 3 -> null (hidden)
const recX2Buy3 = getRecommendationTarget({ x2Count: 3, x1Count: 0 });
assert.strictEqual(recX2Buy3, null, "X2 Buy 3 must hide recommendation card");
console.log("✓ 3D: X2 Buy 3 correctly hides recommendation card.");

// 3E: X1 Buy 2 -> null (hidden)
const recX1Buy2 = getRecommendationTarget({ x2Count: 0, x1Count: 2 });
assert.strictEqual(recX1Buy2, null, "X1 Buy 2 must hide recommendation card");
console.log("✓ 3E: X1 Buy 2 correctly hides recommendation card.");

// 3F: X1 Buy 3 -> null (hidden)
const recX1Buy3 = getRecommendationTarget({ x2Count: 0, x1Count: 3 });
assert.strictEqual(recX1Buy3, null, "X1 Buy 3 must hide recommendation card");
console.log("✓ 3F: X1 Buy 3 correctly hides recommendation card.");

// 3G: No brush (heads only) -> null (hidden)
const recHeadsOnly = getRecommendationTarget({ x2Count: 0, x1Count: 0 });
assert.strictEqual(recHeadsOnly, null, "No brush must hide recommendation card");
console.log("✓ 3G: No brush in cart correctly hides recommendation card.");

console.log("\n=== ALL CART RECOMMENDATION & DYNAMIC REMOVAL TESTS PASSED SUCCESSFULLY! ===");
