"use strict";

var crypto = require("node:crypto");
var shopbase = require("../../lib/shopbase-orders");

var CONVERSION_NAME = "Miroooo UK - Purchase";
var LOOKBACK_DAYS = 30;
var INCLUDED_FINANCIAL_STATUSES = new Set(["authorized", "paid"]);

function requiredEnvironment(name) {
  var value = process.env[name] && process.env[name].trim();
  if (!value) throw new Error("Missing " + name + ".");
  return value;
}

function secretsMatch(provided, configured) {
  if (!provided || !configured) return false;
  var providedBytes = Buffer.from(String(provided));
  var configuredBytes = Buffer.from(String(configured));
  return providedBytes.length === configuredBytes.length && crypto.timingSafeEqual(providedBytes, configuredBytes);
}

function normaliseMsclkid(value) {
  var normalised = String(value || "").trim().toLowerCase();
  return /^[a-f0-9]{32}$/.test(normalised) ? normalised : null;
}

function formatMicrosoftTimeUtc(value) {
  var date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  function pad(part) {
    return String(part).padStart(2, "0");
  }

  var hours = date.getUTCHours();
  var meridiem = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return (
    String(date.getUTCMonth() + 1) +
    "/" +
    String(date.getUTCDate()) +
    "/" +
    String(date.getUTCFullYear()) +
    " " +
    String(hours) +
    ":" +
    pad(date.getUTCMinutes()) +
    ":" +
    pad(date.getUTCSeconds()) +
    " " +
    meridiem
  );
}

function csvCell(value) {
  var stringValue = String(value);
  return /[",\r\n]/.test(stringValue) ? '"' + stringValue.replaceAll('"', '""') + '"' : stringValue;
}

function orderTimestamp(order) {
  return order.processed_at || order.created_at || null;
}

function buildConversionRows(orders) {
  var seen = new Set();
  var rows = [];
  var sortedOrders = orders.slice().sort(function (left, right) {
    return new Date(orderTimestamp(right) || 0).getTime() - new Date(orderTimestamp(left) || 0).getTime();
  });

  sortedOrders.forEach(function (order) {
    var financialStatus = String(order.financial_status || "").trim().toLowerCase();
    if (!INCLUDED_FINANCIAL_STATUSES.has(financialStatus) || order.cancelled_at) return;

    var clickId = normaliseMsclkid(shopbase.extractMsclkid(order));
    var timestamp = orderTimestamp(order);
    var conversionTime = timestamp ? formatMicrosoftTimeUtc(timestamp) : null;
    var rawValue = Number(order.total_price);
    var currency = String(order.currency || "USD").trim().toUpperCase();

    if (!clickId || !conversionTime || !Number.isFinite(rawValue) || rawValue < 0 || !/^[A-Z]{3}$/.test(currency)) {
      return;
    }

    var dedupeKey = clickId + "|" + CONVERSION_NAME + "|" + conversionTime;
    if (seen.has(dedupeKey)) return;
    seen.add(dedupeKey);

    rows.push(
      [clickId, CONVERSION_NAME, conversionTime, rawValue.toFixed(2), currency]
        .map(csvCell)
        .join(",")
    );
  });

  return rows;
}

function querySecret(req) {
  try {
    return new URL(req.url || "", "https://www.trymiroooo.com").searchParams.get("secret");
  } catch (_) {
    return null;
  }
}

async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).send("Method not allowed.");
  }

  var configuredSecret;
  try {
    configuredSecret = requiredEnvironment("MIROOOO_BING_OFFLINE_FEED_SECRET");
  } catch (_) {
    return res.status(503).send("Offline conversion feed is not configured.");
  }

  if (!secretsMatch(querySecret(req), configuredSecret)) {
    return res.status(401).send("Unauthorized request.");
  }

  try {
    var createdAtMin = new Date(Date.now() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000).toISOString();
    var orders = await shopbase.fetchRecentOrders({ createdAtMin: createdAtMin, limit: 250 });
    var rows = buildConversionRows(orders);
    var csv = [
      "Parameters:TimeZone=+0000",
      "Microsoft Click Id,Conversion Name,Conversion Time,Conversion Value,Conversion Currency"
    ].concat(rows).join("\r\n") + "\r\n";

    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Disposition", 'attachment; filename="miroooo-microsoft-offline-conversions.csv"');
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("X-Conversion-Count", String(rows.length));
    return res.status(200).send(csv);
  } catch (error) {
    console.error(
      "Miroooo Microsoft Ads offline conversion feed failed",
      error instanceof Error ? error.message : error
    );
    return res.status(502).send("Could not generate the offline conversion feed.");
  }
}

handler._test = {
  buildConversionRows: buildConversionRows,
  formatMicrosoftTimeUtc: formatMicrosoftTimeUtc,
  normaliseMsclkid: normaliseMsclkid,
  secretsMatch: secretsMatch
};

module.exports = handler;
