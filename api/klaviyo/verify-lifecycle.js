"use strict";
const { secretMatches, processLifecycle } = require("../../lib/miroooo-lifecycle");
module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ ok: false }); }
  if (!secretMatches(String(req.headers["x-miroooo-email-secret"] || ""), process.env.MIROOOO_EMAIL_WEBHOOK_SECRET)) return res.status(401).json({ ok: false });
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    return res.status(200).json({ ok: true, ...await processLifecycle(body) });
  } catch (error) {
    console.error("Miroooo lifecycle verification failed", error.message);
    return res.status(502).json({ ok: false, error: "Lifecycle verification unavailable; no email triggered." });
  }
};
