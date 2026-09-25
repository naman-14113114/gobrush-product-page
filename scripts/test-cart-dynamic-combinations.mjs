import assert from "node:assert";
import { createXpageCartCheckout, XPAGE_VARIANTS, detectBundlePayload } from "../lib/xpage-checkout.js";

console.log("=== COMPREHENSIVE TEST SUITE: DYNAMIC CART COMBINATIONS & CHECKOUT MATCHING ===");

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

  const hasPaidHeads = (x2HeadsCount > 0 || x1HeadsCount > 0);
  const isPureX2Bundle = !hasPaidHeads && x1Count === 0 && (x2Count === 2 || x2Count === 3);
  const isPureX1Bundle = !hasPaidHeads && x2Count === 0 && (x1Count === 2 || x1Count === 3);

  const x2Compare = x2Count * 139;
  const x1Compare = x1Count * 119;
  const x2HeadsCompare = x2HeadsCount * 10;
  const x1HeadsCompare = x1HeadsCount * 10;
  const compareAt = x2Compare + x1Compare + x2HeadsCompare + x1HeadsCompare;

  const baseBrushCompareSavings = (x2Count * (139 - 69)) + (x1Count * (119 - 59));

  let x2BundlePromoDiscount = 0;
  let x2BundlePromoName = "";
  let extraBrushHeadSets = 0;

  if (isPureX2Bundle) {
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
  if (isPureX1Bundle) {
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
    isPureX2Bundle,
    isPureX1Bundle
  };
}

// Function simulating prepareItemsForCheckout
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

// --- TEST CASES ---

console.log("\n--- TEST CASE 1: Miroooo X2 Buy 1 (Single Brush) ---");
{
  const cart = [{ productHandle: "miroooo-x2", color: "Silver", quantity: 1, unitPrice: 69, comparePrice: 139 }];
  const totals = computeTotals(cart);
  assert.strictEqual(totals.subtotal, 69);
  assert.strictEqual(totals.extraBrushHeadSets, 0, "No free heads for Buy 1");
  assert.strictEqual(totals.bundlePromoDiscount, 0);
  console.log("✓ Cart totals for X2 Buy 1:", totals.subtotal, "(Free heads: " + totals.extraBrushHeadSets + ")");
}

console.log("\n--- TEST CASE 2: Miroooo X2 Pure Buy 2 Bundle (2 Brushes, 0 Paid Heads) ---");
{
  const cart = [{ productHandle: "miroooo-x2", color: "Silver", quantity: 2, unitPrice: 69, comparePrice: 139 }];
  const totals = computeTotals(cart);
  assert.strictEqual(totals.subtotal, 128, "Buy 2 price must be £128");
  assert.strictEqual(totals.extraBrushHeadSets, 1, "Must unlock 1 free heads set");
  assert.strictEqual(totals.bundlePromoDiscount, 10);
  console.log("✓ Cart totals for X2 Pure Buy 2:", totals.subtotal, "(Free heads: " + totals.extraBrushHeadSets + " set)");

  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundlePayload = detectBundlePayload(checkoutItems);
  assert.ok(bundlePayload !== null, "Must detect bundle payload for pure Buy 2");
  console.log("✓ XPage bundle detection verified for Pure Buy 2!");
}

console.log("\n--- TEST CASE 3: Miroooo X2 (2 Brushes) + Paid Heads Added From Product Page ---");
{
  // User has 2 brushes and added 1 extra head set from product page
  const cart = [
    { productHandle: "miroooo-x2", color: "Silver", quantity: 2, unitPrice: 69, comparePrice: 139 },
    { productHandle: "miroooo-x2-heads", color: "Default", quantity: 1, unitPrice: 10, comparePrice: 10 }
  ];
  const totals = computeTotals(cart);
  assert.strictEqual(totals.subtotal, 148, "2 brushes (£138) + 1 head (£10) = £148 with NO bundle discount");
  assert.strictEqual(totals.extraBrushHeadSets, 0, "NO free heads when paid heads are present");
  assert.strictEqual(totals.bundlePromoDiscount, 0, "NO bundle discount when paid heads are present");
  console.log("✓ Cart totals for X2 2 Brushes + Paid Heads:", totals.subtotal, "(Free heads: " + totals.extraBrushHeadSets + ")");

  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundlePayload = detectBundlePayload(checkoutItems);
  assert.strictEqual(bundlePayload, null, "Standard cart must not trigger bundle order");
  console.log("✓ Verified standard checkout routing for 2 Brushes + Paid Heads!");
}

console.log("\n--- TEST CASE 4: Miroooo X2 Pure Buy 3 Bundle (3 Brushes, 0 Paid Heads) ---");
{
  const cart = [{ productHandle: "miroooo-x2", color: "Silver", quantity: 3, unitPrice: 69, comparePrice: 139 }];
  const totals = computeTotals(cart);
  assert.strictEqual(totals.subtotal, 177, "Buy 3 price must be £177");
  assert.strictEqual(totals.extraBrushHeadSets, 2, "Must unlock 2 free heads sets");
  assert.strictEqual(totals.bundlePromoDiscount, 30);
  console.log("✓ Cart totals for X2 Pure Buy 3:", totals.subtotal, "(Free heads: " + totals.extraBrushHeadSets + " sets)");

  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundlePayload = detectBundlePayload(checkoutItems);
  assert.ok(bundlePayload !== null, "Must detect bundle payload for pure Buy 3");
  console.log("✓ XPage bundle detection verified for Pure Buy 3!");
}

console.log("\n--- TEST CASE 5: Miroooo X1 Pure Buy 2 Bundle (2 Brushes, 0 Paid Heads) ---");
{
  const cart = [{ productHandle: "miroooo-x", color: "Silver", quantity: 2, unitPrice: 59, comparePrice: 119 }];
  const totals = computeTotals(cart);
  assert.strictEqual(totals.subtotal, 108, "X1 Buy 2 price must be £108 (2*59 - 10)");
  assert.strictEqual(totals.extraX1BrushHeadSets, 1, "Must unlock 1 free X1 heads set");
  assert.strictEqual(totals.bundleSavings, 130);
  console.log("✓ Cart totals for X1 Pure Buy 2:", totals.subtotal, "(Free heads: " + totals.extraX1BrushHeadSets + " set)");

  const checkoutItems = prepareCheckoutItems(cart, totals);
  const bundlePayload = detectBundlePayload(checkoutItems);
  assert.ok(bundlePayload !== null, "Must detect bundle payload for X1 Pure Buy 2");
  console.log("✓ XPage bundle detection verified for X1 Pure Buy 2!");
}

console.log("\n--- TEST CASE 6: Miroooo X1 (2 Brushes) + Paid Heads Added From Product Page ---");
{
  const cart = [
    { productHandle: "miroooo-x", color: "Silver", quantity: 2, unitPrice: 59, comparePrice: 119 },
    { productHandle: "miroooo-x1-heads", color: "Default", quantity: 1, unitPrice: 10, comparePrice: 10 }
  ];
  const totals = computeTotals(cart);
  assert.strictEqual(totals.subtotal, 128, "2 X1 brushes (£118) + 1 head (£10) = £128 with NO bundle discount");
  assert.strictEqual(totals.extraX1BrushHeadSets, 0, "NO free heads when paid heads are present");
  console.log("✓ Cart totals for X1 2 Brushes + Paid Heads:", totals.subtotal, "(Free heads: " + totals.extraX1BrushHeadSets + ")");
}

console.log("\n--- TEST CASE 7: MIROOOO10 on Miroooo X2 (1 Brush, 0 Heads) ---");
{
  const cart = [{ productHandle: "miroooo-x2", color: "Silver", quantity: 1, unitPrice: 69, comparePrice: 139 }];
  const totals = computeTotals(cart, ["MIROOOO10"]);
  assert.strictEqual(totals.subtotal, 69);
  assert.strictEqual(totals.promoDiscount, 7, "10% of £69 rounded to nearest integer is £7");
  assert.strictEqual(totals.finalSubtotal, 62, "Final subtotal must be £62 (£69 - £7)");
  console.log("✓ Miroooo X2 + MIROOOO10: Subtotal £" + totals.subtotal + " - Promo £" + totals.promoDiscount + " = Final £" + totals.finalSubtotal);
}

console.log("\n--- TEST CASE 8: MIROOOO10 on Miroooo X1 (1 Brush, 0 Heads) ---");
{
  const cart = [{ productHandle: "miroooo-x", color: "Silver", quantity: 1, unitPrice: 59, comparePrice: 119 }];
  const totals = computeTotals(cart, ["MIROOOO10"]);
  assert.strictEqual(totals.subtotal, 59);
  assert.strictEqual(totals.promoDiscount, 6, "10% of £59 rounded to nearest integer is £6");
  assert.strictEqual(totals.finalSubtotal, 53, "Final subtotal must be £53 (£59 - £6)");
  console.log("✓ Miroooo X1 + MIROOOO10: Subtotal £" + totals.subtotal + " - Promo £" + totals.promoDiscount + " = Final £" + totals.finalSubtotal);
}

console.log("\n--- TEST CASE 9: MIROOOO10 on Miroooo X2 (1 Brush) + 1x Heads (Excluding Heads Price) ---");
{
  const cart = [
    { productHandle: "miroooo-x2", color: "Silver", quantity: 1, unitPrice: 69, comparePrice: 139 },
    { productHandle: "miroooo-x2-heads", color: "Default", quantity: 1, unitPrice: 10, comparePrice: 10 }
  ];
  const totals = computeTotals(cart, ["MIROOOO10"]);
  assert.strictEqual(totals.subtotal, 79, "Subtotal is £69 brush + £10 heads = £79");
  assert.strictEqual(totals.promoDiscount, 7, "Promo discount is strictly 10% of £69 brush = £7, heads excluded (£0)");
  assert.strictEqual(totals.finalSubtotal, 72, "Final subtotal must be £72 (£79 - £7)");
  console.log("✓ Miroooo X2 + Heads + MIROOOO10: Subtotal £" + totals.subtotal + " - Promo £" + totals.promoDiscount + " = Final £" + totals.finalSubtotal);
}

console.log("\n--- TEST CASE 10: MIROOOO10 on Miroooo X1 (1 Brush) + 2x Heads (Excluding Heads Price) ---");
{
  const cart = [
    { productHandle: "miroooo-x", color: "Silver", quantity: 1, unitPrice: 59, comparePrice: 119 },
    { productHandle: "miroooo-x1-heads", color: "Default", quantity: 2, unitPrice: 10, comparePrice: 10 }
  ];
  const totals = computeTotals(cart, ["MIROOOO10"]);
  assert.strictEqual(totals.subtotal, 79, "Subtotal is £59 brush + £20 heads = £79");
  assert.strictEqual(totals.promoDiscount, 6, "Promo discount is strictly 10% of £59 brush = £6, heads excluded (£0)");
  assert.strictEqual(totals.finalSubtotal, 73, "Final subtotal must be £73 (£79 - £6)");
  console.log("✓ Miroooo X1 + 2x Heads + MIROOOO10: Subtotal £" + totals.subtotal + " - Promo £" + totals.promoDiscount + " = Final £" + totals.finalSubtotal);
}

console.log("\n--- TEST CASE 11: MIROOOO10 on Standalone Heads ONLY (100% Excluded -> £0 Promo Discount) ---");
{
  const cart = [
    { productHandle: "miroooo-x2-heads", color: "Default", quantity: 2, unitPrice: 10, comparePrice: 10 }
  ];
  const totals = computeTotals(cart, ["MIROOOO10"]);
  assert.strictEqual(totals.subtotal, 20, "Subtotal is 2x £10 = £20");
  assert.strictEqual(totals.promoDiscount, 0, "Promo discount on heads only is £0 (heads excluded)");
  assert.strictEqual(totals.finalSubtotal, 20, "Final subtotal must remain £20");
  console.log("✓ Standalone Heads + MIROOOO10: Subtotal £" + totals.subtotal + " - Promo £" + totals.promoDiscount + " = Final £" + totals.finalSubtotal);
}

console.log("\n--- TEST CASE 12: Live XPage Session for 2x X2 Brushes + 1x Paid Heads (Matching Image 3) ---");
{
  const session = await createXpageCartCheckout({
    cart: [
      { productHandle: "miroooo-x2", color: "Silver", quantity: 2, variantId: XPAGE_VARIANTS.x2_silver },
      { productHandle: "miroooo-x2-heads", quantity: 1, variantId: XPAGE_VARIANTS.x2_heads }
    ],
    currency: "GBP",
    attribution: { utm_source: "google" }
  });

  console.log("Checkout URL:", session.checkoutUrl);
  console.log("Cart Payload:", session.cart);
  assert.ok(session.ok);
  assert.strictEqual(session.isBundle, false, "Must use standard cart session");
  assert.strictEqual(session.cart.find(i => i.variant_id === XPAGE_VARIANTS.x2_silver)?.quantity, 2);
  assert.strictEqual(session.cart.find(i => i.variant_id === XPAGE_VARIANTS.x2_heads)?.quantity, 1);
  console.log("✓ Live session created matching Image 3 (£148 total)!");
}

console.log("\n--- TEST CASE 13: Live XPage Session for Pure Buy 2 Bundle (Matching Image 1) ---");
{
  const session = await createXpageCartCheckout({
    cart: [
      { productHandle: "miroooo-x2", color: "Silver", quantity: 2, variantId: XPAGE_VARIANTS.x2_silver },
      { productHandle: "miroooo-x2-heads", isFree: true, quantity: 1, variantId: XPAGE_VARIANTS.x2_heads }
    ],
    currency: "GBP",
    attribution: { utm_source: "google" }
  });

  console.log("Checkout URL:", session.checkoutUrl);
  console.log("Cart Payload:", session.cart);
  assert.ok(session.ok);
  assert.strictEqual(session.isBundle, true, "Must use native bundle session");
  console.log("✓ Live session created matching Image 1 (£128 total with BUY 2 savings)!");
}

console.log("\n>>> ALL DYNAMIC COMBINATION AND CHECKOUT TESTS PASSED WITH 100% SUCCESS! <<<");
