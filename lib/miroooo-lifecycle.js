"use strict";

const crypto = require("node:crypto");
const ROOT = "https://www.trymiroooo.com";
const CDN = "https://d3k81ch9hvuctc.cloudfront.net/company/TQtq2j/images/";
const PRODUCTS = {
  "1000000675113473": { model: "X1", name: "Brush X1", handle: "miroooo-x", image: CDN + "2fea3bd3-c11d-4352-a4a9-b4ebb41b5184.jpeg", heads: false },
  "1000000675072187": { model: "X2", name: "Brush X2", handle: "miroooo-x2", image: CDN + "938f5342-b52f-44a9-b64c-0a5f5a608bdf.jpeg", heads: false },
  "1000000675471182": { model: "X1", name: "Brush X1 Heads", handle: "miroooo-x1-heads", image: CDN + "db077ed0-3c99-4536-b7ca-745010b55268.jpeg", heads: true },
  "1000000675616058": { model: "X2", name: "Brush X2 Heads", handle: "miroooo-x2-heads", image: CDN + "268d9b15-c592-4ab7-87e8-961a673cdcce.jpeg", heads: true }
};
const VARIANTS = {
  "1000020700958564": ["1000000675113473", "Grey"],
  "1000020700958562": ["1000000675113473", "Pink"],
  "1000020700958563": ["1000000675113473", "Silver"],
  "1000020700182883": ["1000000675072187", "Grey"],
  "1000020700182882": ["1000000675072187", "Pink"],
  "1000020700182884": ["1000000675072187", "Silver"],
  "1000020710139724": ["1000000675471182", "2-head pack"],
  "1000020718937117": ["1000000675616058", "2-head pack"]
};
function normaliseItem(item) {
  const variantId = String(item.variant_id || item.VariantID || "");
  const match = VARIANTS[variantId];
  if (!match) return null;
  const productId = String(item.product_id || item.ProductID || "");
  const product = PRODUCTS[match ? match[0] : productId];
  if (!product || (match && PRODUCTS[productId] && productId !== match[0])) return null;
  const colour = match?.[1] || item.variant_title || "";
  let image = product.image;
  if (product.model === "X1" && !product.heads && colour === "Silver") image = CDN + "b8861a0c-70ce-44df-891d-f687d9a9444a.jpeg";
  if (product.model === "X1" && !product.heads && colour === "Grey") image = CDN + "b95c2e51-3c4c-4c10-a859-a3d100f33b7b.jpeg";
  if (product.model === "X2" && !product.heads && colour === "Grey") image = CDN + "5ba26640-5ed9-4062-858d-a0de9874d287.jpeg";
  if (product.model === "X2" && !product.heads && colour === "Pink") image = CDN + "e5d53deb-8be0-4af3-b179-f61c726acf5c.jpeg";
  return {
    ProductName: product.name, ProductID: match ? match[0] : productId, VariantID: variantId,
    Model: product.model, IsHeads: product.heads, VariantName: colour,
    Quantity: Math.max(1, Number(item.qty || item.quantity || item.Quantity) || 1),
    ImageURL: image, ProductURL: ROOT + "/products/" + product.handle + (!product.heads && colour ? "?color=" + encodeURIComponent(colour) : ""),
    HeadsURL: ROOT + "/products/miroooo-" + product.model.toLowerCase() + "-heads"
  };
}
function secretMatches(provided, expected) {
  if (!expected || !provided) return false;
  const a = Buffer.from(provided), b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
async function klaviyo(path, method = "GET", data) {
  const key = process.env.MIROOOO_KLAVIYO_API_KEY;
  if (!key) throw new Error("Missing Miroooo Klaviyo key");
  const response = await fetch("https://a.klaviyo.com/api/" + path, {
    method, headers: { Authorization: "Klaviyo-API-Key " + key, revision: "2026-07-15", accept: "application/vnd.api+json", "content-type": "application/vnd.api+json" },
    ...(data ? { body: JSON.stringify(data) } : {}), signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error("Klaviyo request failed " + response.status);
  return response.status === 202 || response.status === 204 ? null : response.json();
}
async function profileForEmail(email) {
  const filter = encodeURIComponent("equals(email," + JSON.stringify(email) + ")");
  const response = await klaviyo("profiles/?filter=" + filter + "&additional-fields[profile]=subscriptions");
  return response.data.length === 1 ? response.data[0] : null;
}
async function hasRecentPurchase(profileId, hours) {
  const since = new Date(Date.now() - hours * 3600000).toISOString();
  const filter = encodeURIComponent('and(equals(metric_id,"SMpP5f"),equals(profile_id,"' + profileId + '"),greater-or-equal(datetime,' + since + '))');
  const response = await klaviyo("events/?page[size]=1&filter=" + filter);
  return response.data.length > 0;
}
async function readCheckout(checkoutUrl) {
  let url;
  try { url = new URL(checkoutUrl); } catch { return null; }
  if (url.origin !== "https://miroooo.us" || !/^\/checkouts\/[a-f0-9]{32}$/.test(url.pathname)) return null;
  const token = url.pathname.split("/").pop();
  const response = await fetch("https://miroooo.us/api/checkout/" + token + "/next/new-info.json", {
    headers: { accept: "application/json", "x-shopbase-checkout-token": token, "x-source-page": "checkout" },
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error("Checkout lookup failed " + response.status);
  const result = await response.json();
  if (result.code !== 200 || !result.result?.info) throw new Error("Invalid checkout response");
  return { token, url: url.origin + url.pathname, ...result.result };
}
async function readOrder(orderId) {
  if (!/^\d{6,16}$/.test(String(orderId))) return null;
  const origin = (process.env.SHOPBASE_STORE_URL || "https://muuhu.onshopbase.com").replace(/\/$/, "");
  if (new URL(origin).hostname !== "muuhu.onshopbase.com") throw new Error("Wrong ShopBase account");
  const key = process.env.SHOPBASE_API_KEY, password = process.env.SHOPBASE_PASSWORD;
  if (!key || !password) throw new Error("Missing ShopBase order credentials");
  const response = await fetch(origin + "/admin/orders/" + orderId + ".json", {
    headers: { accept: "application/json", Authorization: "Basic " + Buffer.from(key + ":" + password).toString("base64") }, signal: AbortSignal.timeout(10000)
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Order lookup failed " + response.status);
  return (await response.json()).order;
}
async function processLifecycle(body) {
  const email = String(body.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: "invalid_email" };
  if (!["checkout", "purchase"].includes(body.kind)) return { status: "invalid_kind" };
  if (body.kind === "checkout" && ![1, 2, 3].includes(Number(body.stage))) return { status: "invalid_stage" };
  const profile = await profileForEmail(email);
  if (!profile) return { status: "profile_not_found" };
  const marketing = profile.attributes.subscriptions?.email?.marketing;
  if (!marketing?.can_receive_email_marketing || marketing.consent === "UNSUBSCRIBED" || marketing.suppression?.length || marketing.list_suppressions?.length) return { status: "suppressed" };
  let items, sourceId, properties, metric;
  if (body.kind === "checkout") {
    const checkout = await readCheckout(body.checkout_url);
    if (!checkout) return { status: "invalid_checkout" };
    if (String(checkout.info.email || "").toLowerCase() !== email) return { status: "checkout_owner_mismatch" };
    if (checkout.info.is_completed || checkout.order || Number(checkout.total?.already_paid) > 0) return { status: "already_completed" };
    if (checkout.info.buyer_accepts_marketing !== true && marketing.consent !== "SUBSCRIBED") return { status: "no_marketing_consent" };
    if (await hasRecentPurchase(profile.id, 96)) return { status: "recent_purchase" };
    items = (checkout.items || []).map(normaliseItem);
    if (!items.length || items.some(item => !item)) return { status: "unrecognised_product" };
    if (checkout.items.some(item => item.available === false)) return { status: "unavailable_product" };
    sourceId = checkout.token + ":" + Number(body.stage);
    properties = { CheckoutURL: checkout.url, Stage: Number(body.stage) };
    metric = "Miroooo Checkout Eligible";
  } else {
    const order = await readOrder(body.order_id);
    if (!order) return { status: "order_not_found" };
    if (String(order.email || order.customer?.email || "").toLowerCase() !== email) return { status: "order_owner_mismatch" };
    if (order.financial_status !== "paid" || order.cancelled_at) return { status: "order_not_paid" };
    if (order.buyer_accepts_marketing !== true && order.accepts_marketing !== true && order.customer?.accepts_marketing !== true && marketing.consent !== "SUBSCRIBED") return { status: "no_marketing_consent" };
    items = (order.line_items || []).map(normaliseItem).filter(Boolean);
    if (!items.length) return { status: "unrecognised_product" };
    sourceId = String(order.id);
    properties = { OrderID: sourceId };
    metric = "Miroooo Purchase Verified";
  }
  Object.assign(properties, {
    Verified: true, SourceSite: "trymiroooo.com", Items: items,
    HasX1: items.some(i => i.Model === "X1"), HasX2: items.some(i => i.Model === "X2"),
    HasBrush: items.some(i => !i.IsHeads), HeadsOnly: items.every(i => i.IsHeads),
    FirstProductName: items[0].ProductName
  });
  if (body.dry_run === true) return { status: "eligible", metric, products: items.map(i => ({ model: i.Model, name: i.ProductName, variant: i.VariantName, quantity: i.Quantity })) };
  const uniqueId = crypto.createHash("sha256").update(body.kind + ":" + sourceId + ":" + email).digest("hex");
  await klaviyo("events/", "POST", { data: { type: "event", attributes: {
    unique_id: uniqueId, properties,
    metric: { data: { type: "metric", attributes: { name: metric } } },
    profile: { data: { type: "profile", id: profile.id } }
  } } });
  return { status: "event_accepted", metric };
}
module.exports = { PRODUCTS, VARIANTS, normaliseItem, secretMatches, processLifecycle };
