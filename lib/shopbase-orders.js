"use strict";

function requiredEnvironment(name) {
  var value = process.env[name] && process.env[name].trim();
  if (!value) throw new Error("Missing " + name + ".");
  return value;
}

function getShopbaseConfig() {
  return {
    storeUrl: (process.env.SHOPBASE_STORE_URL || "https://muuhu.onshopbase.com").trim().replace(/\/+$/, ""),
    apiKey: requiredEnvironment("SHOPBASE_API_KEY"),
    password: requiredEnvironment("SHOPBASE_PASSWORD"),
    sharedSecret: requiredEnvironment("SHOPBASE_SHARED_SECRET")
  };
}

async function fetchRecentOrders(options) {
  var settings = options || {};
  var config = getShopbaseConfig();
  var limit = Math.max(1, Math.min(250, Number(settings.limit) || 250));
  var url = new URL(config.storeUrl + "/admin/orders.json");

  url.searchParams.set("status", "any");
  url.searchParams.set("limit", String(limit));
  if (settings.updatedAtMin) url.searchParams.set("updated_at_min", settings.updatedAtMin);
  if (settings.createdAtMin) url.searchParams.set("created_at_min", settings.createdAtMin);
  url.searchParams.set(
    "fields",
    [
      "id",
      "name",
      "order_number",
      "created_at",
      "updated_at",
      "processed_at",
      "paid_at",
      "financial_status",
      "cancelled_at",
      "total_price",
      "currency",
      "line_items",
      "note_attributes",
      "landing_site",
      "referring_site"
    ].join(",")
  );

  var authorization = Buffer.from(config.apiKey + ":" + config.password).toString("base64");
  var response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: "Basic " + authorization
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10000)
  });

  if (!response.ok) {
    throw new Error("ShopBase order request failed (" + response.status + ").");
  }

  var body = await response.json();
  if (Array.isArray(body.orders)) return body.orders;
  if (Array.isArray(body.data)) return body.data;
  return [];
}

function normalisePropertyName(property) {
  return String((property && (property.name || property.key)) || "").trim().toLowerCase();
}

function normaliseClickId(value) {
  var normalised = String(value || "").trim();
  return normalised ? normalised.slice(0, 255) : null;
}

function extractClickIdFromUrl(value) {
  if (!value) return null;
  try {
    return normaliseClickId(new URL(value, "https://attribution.invalid").searchParams.get("msclkid"));
  } catch (_) {
    var match = String(value).match(/(?:^|[?&])msclkid=([^&#]+)/i);
    return match ? normaliseClickId(decodeURIComponent(match[1])) : null;
  }
}

function extractMsclkid(order) {
  var items = Array.isArray(order && order.line_items) ? order.line_items : [];
  for (var itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    var properties = Array.isArray(items[itemIndex].properties) ? items[itemIndex].properties : [];
    for (var propertyIndex = 0; propertyIndex < properties.length; propertyIndex += 1) {
      var property = properties[propertyIndex];
      if (["_blfm_msclkid", "msclkid"].includes(normalisePropertyName(property))) {
        var itemClickId = normaliseClickId(property.value);
        if (itemClickId) return itemClickId;
      }
    }
  }

  var attributes = Array.isArray(order && order.note_attributes) ? order.note_attributes : [];
  for (var attributeIndex = 0; attributeIndex < attributes.length; attributeIndex += 1) {
    var attribute = attributes[attributeIndex];
    if (["_blfm_msclkid", "msclkid"].includes(normalisePropertyName(attribute))) {
      var attributeClickId = normaliseClickId(attribute.value);
      if (attributeClickId) return attributeClickId;
    }
  }

  return extractClickIdFromUrl(order && order.landing_site) || extractClickIdFromUrl(order && order.referring_site);
}

module.exports = {
  extractMsclkid: extractMsclkid,
  fetchRecentOrders: fetchRecentOrders,
  getShopbaseConfig: getShopbaseConfig
};
