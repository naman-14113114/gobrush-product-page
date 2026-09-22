import { createXpageCartCheckout, XPAGE_MIROOOO_VARIANTS } from "../../lib/xpage-checkout.js";

const validDiscountCodes = [
  "MIROOOO10",
  "FREE2HEADS",
  "FREE4HEADS",
  "2-BRUSH-BUNDLE-SPECIAL",
  "3-BRUSH-BUNDLE-OFFER",
  "3-BRUSH-BUNDLE-SPECIAL",
];

function normalizeDiscountCode(code) {
  return String(code || "").trim().toUpperCase();
}

function collectRequestedDiscountCode(body) {
  const candidates = [];
  if (Array.isArray(body.discountCodes)) {
    candidates.push(...body.discountCodes);
  }
  if (typeof body.discountCode === "string" && body.discountCode.trim()) {
    candidates.push(...body.discountCode.split(","));
  }

  const matched = candidates
    .map(normalizeDiscountCode)
    .filter((code) => validDiscountCodes.includes(code));

  // Pick primary coupon (e.g. MIROOOO10, bundle promo, or free heads)
  return matched.find((c) => c === "MIROOOO10") || matched[matched.length - 1] || "";
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 1. Morocco IP Blocking
  const clientCountry = (
    req.headers["x-vercel-ip-country"] ||
    req.headers["cf-ipcountry"] ||
    req.headers["x-country-code"] ||
    req.headers["x-country"] ||
    req.body?.country ||
    ""
  ).toString().trim().toUpperCase();

  if (clientCountry === "MA" || clientCountry === "MOROCCO") {
    return res.status(400).json({
      error: "The checkout has not been connected, and no order has been placed.",
    });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const attribution = body.attribution || {};

    let rawItems = [];

    if (Array.isArray(body.items) && body.items.length > 0) {
      rawItems = body.items;
    } else if (Array.isArray(body.cart?.lines) && body.cart.lines.length > 0) {
      rawItems = body.cart.lines;
    } else if (Array.isArray(body.cart) && body.cart.length > 0) {
      rawItems = body.cart;
    } else if (Array.isArray(body.variantIds) && body.variantIds.length > 0) {
      rawItems = body.variantIds.map((vId) => ({
        variantId: vId,
        quantity: 1,
      }));
    } else if (body.variantId) {
      rawItems = [
        {
          variantId: body.variantId,
          productId: body.productId,
          color: body.color,
          quantity: Math.max(1, Math.round(Number(body.quantity) || 1)),
        },
      ];
    }

    if (!rawItems.length) {
      return res.status(400).json({ error: "Cart is empty." });
    }

    const discountCode = collectRequestedDiscountCode(body);

    const result = await createXpageCartCheckout({
      cart: rawItems,
      discountCode,
      attribution,
      currency: "GBP",
    });

    return res.status(200).json({
      ok: true,
      checkoutUrl: result.checkoutUrl,
      appliedDiscountCode: discountCode || null,
      cart: result.cart,
    });
  } catch (error) {
    console.error("XPage checkout preparation failed:", error);
    return res.status(500).json({
      error: error.message || "Failed to create checkout session",
    });
  }
}
