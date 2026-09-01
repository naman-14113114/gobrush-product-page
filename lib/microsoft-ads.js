"use strict";

var crypto = require("node:crypto");
var shopbase = require("./shopbase-orders");

var MICROSOFT_CAPI_ORIGIN = "https://capi.uet.microsoft.com";
var MAX_EVENT_AGE_MS = 7 * 24 * 60 * 60 * 1000;
var CONVERSION_FINANCIAL_STATUSES = new Set(["authorized", "paid"]);

function requiredEnvironment(name) {
  var value = process.env[name] && process.env[name].trim();
  if (!value) throw new Error("Missing " + name + ".");
  return value;
}

function normaliseCurrency(value) {
  var currency = String(value || "").trim().toUpperCase();
  return /^[A-Z]{3}$/.test(currency) ? currency : null;
}

function orderEventDate(order) {
  var raw = order.paid_at || order.processed_at || order.updated_at || order.created_at;
  var date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

function buildPurchaseEvent(order, now) {
  var financialStatus = String((order && order.financial_status) || "").trim().toLowerCase();
  if (!CONVERSION_FINANCIAL_STATUSES.has(financialStatus) || order.cancelled_at) {
    return { status: "not_authorized_or_paid" };
  }

  var msclkid = shopbase.extractMsclkid(order);
  if (!msclkid) return { status: "missing_msclkid" };

  var total = Number(order.total_price);
  var currency = normaliseCurrency(order.currency);
  var eventDate = orderEventDate(order);
  if (!Number.isFinite(total) || total < 0 || !currency || !eventDate || order.id == null) {
    return { status: "invalid_order" };
  }

  var currentDate = now || new Date();
  var age = currentDate.getTime() - eventDate.getTime();
  if (age > MAX_EVENT_AGE_MS || age < -5 * 60 * 1000) return { status: "stale" };

  var transactionId = String(order.id);
  var value = Number(total.toFixed(2));
  return {
    status: "ready",
    event: {
      eventType: "custom",
      eventId: "miroooo-plusbase-" + transactionId,
      eventName: "purchase",
      eventTime: Math.floor(eventDate.getTime() / 1000),
      userData: { msclkid: msclkid },
      customData: {
        transactionId: transactionId,
        value: value,
        currency: currency,
        pageType: "purchase",
        ecommTotalValue: value
      }
    }
  };
}

async function sendEvents(events) {
  var uniqueEvents = Array.from(new Map(events.map(function (event) {
    return [event.eventId, event];
  })).values());
  if (!uniqueEvents.length) return 0;

  var tagId = requiredEnvironment("MICROSOFT_UET_TAG_ID");
  var token = requiredEnvironment("MICROSOFT_CAPI_TOKEN");
  var response = await fetch(
    MICROSOFT_CAPI_ORIGIN + "/v1/" + encodeURIComponent(tagId) + "/events",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: uniqueEvents }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000)
    }
  );

  if (!response.ok) {
    throw new Error("Microsoft CAPI request failed (" + response.status + ").");
  }

  return uniqueEvents.length;
}

async function sendPurchase(order) {
  var result = buildPurchaseEvent(order);
  if (result.status !== "ready") return result;
  await sendEvents([result.event]);
  return { status: "sent", eventId: result.event.eventId };
}

function secretMatches(provided, expected) {
  if (!provided || !expected) return false;
  var providedBuffer = Buffer.from(String(provided));
  var expectedBuffer = Buffer.from(String(expected));
  return providedBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(providedBuffer, expectedBuffer);
}

function verifyWebhook(rawBody, providedHmac) {
  if (!rawBody || !providedHmac) return false;
  var secret = shopbase.getShopbaseConfig().sharedSecret;
  var expected = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");
  return secretMatches(String(providedHmac).trim(), expected);
}

function getWebhookOrder(payload) {
  if (!payload || typeof payload !== "object") return null;
  var candidate = payload.order && typeof payload.order === "object" ? payload.order : payload;
  return candidate.id != null && candidate.created_at && candidate.financial_status ? candidate : null;
}

module.exports = {
  buildPurchaseEvent: buildPurchaseEvent,
  getWebhookOrder: getWebhookOrder,
  secretMatches: secretMatches,
  sendEvents: sendEvents,
  sendPurchase: sendPurchase,
  verifyWebhook: verifyWebhook
};
