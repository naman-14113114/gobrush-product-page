"use strict";

var microsoftAds = require("../../../lib/microsoft-ads");

async function readRawBody(req) {
  if (typeof req.body === "string") return req.body;
  if (Buffer.isBuffer(req.body)) return req.body.toString("utf8");

  var chunks = [];
  for await (var chunk of req) chunks.push(Buffer.from(chunk));
  if (chunks.length) return Buffer.concat(chunks).toString("utf8");
  return req.body && typeof req.body === "object" ? JSON.stringify(req.body) : "";
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  try {
    var rawBody = await readRawBody(req);
    var querySecret = req.query && req.query.secret;
    var configuredEndpointSecret = (process.env.SHOPBASE_WEBHOOK_SECRET || "").trim();
    var validQuerySecret = microsoftAds.secretMatches(querySecret, configuredEndpointSecret);
    var providedHmac = req.headers["x-shopbase-hmac-sha256"] || null;

    if (!validQuerySecret && !microsoftAds.verifyWebhook(rawBody, providedHmac)) {
      return res.status(401).json({ ok: false, error: "Invalid ShopBase webhook signature." });
    }

    var payload = rawBody ? JSON.parse(rawBody) : req.body;
    var order = microsoftAds.getWebhookOrder(payload);
    if (!order) {
      return res.status(400).json({ ok: false, error: "Invalid ShopBase order payload." });
    }

    var result = await microsoftAds.sendPurchase(order);
    console.info("Miroooo Microsoft purchase webhook processed", {
      orderId: String(order.id),
      result: result.status
    });
    return res.status(200).json({ ok: true, result: result.status });
  } catch (error) {
    console.error("Miroooo Microsoft purchase webhook failed", error instanceof Error ? error.message : error);
    return res.status(502).json({ ok: false, error: "Purchase delivery failed." });
  }
};

module.exports.config = {
  api: { bodyParser: false }
};
