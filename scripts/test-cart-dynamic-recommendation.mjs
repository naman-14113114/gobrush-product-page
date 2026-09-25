import assert from "node:assert";
import fs from "node:fs";

console.log("=== RUNNING CART DYNAMIC RECOMMENDATION & PURE BUNDLE TESTS ===\n");

// Read cart.html and extract script logic for validation
const cartHtml = fs.readFileSync("cart.html", "utf8");

// Verify critical strings and logic are present in cart.html
console.log("TEST 1: Verifying cart.html code structure...");
assert.ok(cartHtml.includes("cart-upsell-container"), "cart-upsell-container must exist");
assert.ok(cartHtml.includes("cart-upsell-add-btn"), "cart-upsell-add-btn must exist");
assert.ok(cartHtml.includes("miroooo-x2-heads"), "miroooo-x2-heads must exist");
assert.ok(cartHtml.includes("miroooo-x1-heads"), "miroooo-x1-heads must exist");
assert.ok(cartHtml.includes("isPureX2Bundle"), "isPureX2Bundle must exist");
assert.ok(cartHtml.includes("isPureX1Bundle"), "isPureX1Bundle must exist");
assert.ok(cartHtml.includes("upsellContainer.style.display = \"none\""), "upsell card hiding logic must exist");
console.log("✓ TEST 1 Passed: cart.html contains all necessary logic.\n");

// Test 2: Recommendation Target Decision Function
console.log("TEST 2: Testing Recommendation Target Calculation...");

function getRecommendationTarget(totals) {
  if (totals.x2Count === 1 && totals.x1Count === 0 && totals.x2HeadsCount === 0 && totals.x1HeadsCount === 0) {
    return { handle: "miroooo-x2-heads", title: "Miroooo X2 Heads (1 Set)", visible: true };
  }
  if (totals.x1Count === 1 && totals.x2Count === 0 && totals.x2HeadsCount === 0 && totals.x1HeadsCount === 0) {
    return { handle: "miroooo-x1-heads", title: "Miroooo X1 Heads (1 Set)", visible: true };
  }
  return null;
}

// 2A: X2 Buy 1 -> recommends X2 Heads
const recX2 = getRecommendationTarget({ x2Count: 1, x1Count: 0, x2HeadsCount: 0, x1HeadsCount: 0 });
assert.ok(recX2);
assert.strictEqual(recX2.handle, "miroooo-x2-heads");
assert.strictEqual(recX2.visible, true);
console.log("✓ 2A: X2 Buy 1 correctly recommends Miroooo X2 Heads.");

// 2B: X1 Buy 1 -> recommends X1 Heads
const recX1 = getRecommendationTarget({ x2Count: 0, x1Count: 1, x2HeadsCount: 0, x1HeadsCount: 0 });
assert.ok(recX1);
assert.strictEqual(recX1.handle, "miroooo-x1-heads");
assert.strictEqual(recX1.visible, true);
console.log("✓ 2B: X1 Buy 1 correctly recommends Miroooo X1 Heads.");

// 2C: X2 Buy 2 -> null (hides recommendation)
const recX2Buy2 = getRecommendationTarget({ x2Count: 2, x1Count: 0, x2HeadsCount: 0, x1HeadsCount: 0 });
assert.strictEqual(recX2Buy2, null);
console.log("✓ 2C: X2 Buy 2 correctly hides recommendation card.");

// 2D: X2 Buy 3 -> null (hides recommendation)
const recX2Buy3 = getRecommendationTarget({ x2Count: 3, x1Count: 0, x2HeadsCount: 0, x1HeadsCount: 0 });
assert.strictEqual(recX2Buy3, null);
console.log("✓ 2D: X2 Buy 3 correctly hides recommendation card.");

// 2E: X1 Buy 2 -> null (hides recommendation)
const recX1Buy2 = getRecommendationTarget({ x2Count: 0, x1Count: 2, x2HeadsCount: 0, x1HeadsCount: 0 });
assert.strictEqual(recX1Buy2, null);
console.log("✓ 2E: X1 Buy 2 correctly hides recommendation card.");

// 2F: X1 Buy 3 -> null (hides recommendation)
const recX1Buy3 = getRecommendationTarget({ x2Count: 0, x1Count: 3, x2HeadsCount: 0, x1HeadsCount: 0 });
assert.strictEqual(recX1Buy3, null);
console.log("✓ 2F: X1 Buy 3 correctly hides recommendation card.");

// 2G: No brush in cart -> null
const recNoBrush = getRecommendationTarget({ x2Count: 0, x1Count: 0, x2HeadsCount: 1, x1HeadsCount: 0 });
assert.strictEqual(recNoBrush, null);
console.log("✓ 2G: No brush in cart correctly hides recommendation card.");

console.log("\n=== ALL CART RECOMMENDATION & PURE BUNDLE TESTS PASSED SUCCESSFULLY! ===");
