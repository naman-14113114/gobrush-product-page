"use strict";

var shopbase = require("../../lib/shopbase-orders");
var microsoftAds = require("../../lib/microsoft-ads");

function isAuthorized(req) {
  var configured = (process.env.CRON_SECRET || "").trim();
  var provided = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  return microsoftAds.secretMatches(provided, configured);
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }
  if (!isAuthorized(req)) return res.status(401).json({ ok: false, error: "Unauthorized." });

  try {
    var updatedAtMin = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString();
    var orders = await shopbase.fetchRecentOrders({ updatedAtMin: updatedAtMin, limit: 250 });
    var events = [];
    var summary = {
      checked: orders.length,
      ready: 0,
      sent: 0,
      notAuthorizedOrPaid: 0,
      missingMsclkid: 0,
      invalidOrder: 0,
      stale: 0
    };

    orders.forEach(function (order) {
      var result = microsoftAds.buildPurchaseEvent(order);
      if (result.status === "ready") {
        events.push(result.event);
        summary.ready += 1;
      } else if (result.status === "not_authorized_or_paid") {
        summary.notAuthorizedOrPaid += 1;
      } else if (result.status === "missing_msclkid") {
        summary.missingMsclkid += 1;
      } else if (result.status === "invalid_order") {
        summary.invalidOrder += 1;
      } else {
        summary.stale += 1;
      }
    });

    summary.sent = await microsoftAds.sendEvents(events);
    return res.status(200).json(Object.assign({ ok: true }, summary));
  } catch (error) {
    console.error("Miroooo Microsoft purchase reconciliation failed", error instanceof Error ? error.message : error);
    return res.status(502).json({ ok: false, error: "Purchase reconciliation failed." });
  }
};
