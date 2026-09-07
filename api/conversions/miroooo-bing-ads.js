"use strict";

var crypto = require("node:crypto");

var FEED_SECRET_SHA256 =
  "8fc587ed07041004b9f39d67ceaaf367d9ce9103b330824cc6301d5ca8f2fe09";
var UPSTREAM_FEED_URL =
  "https://www.trustpilotreview.shop/api/conversions/miroooo-bing-ads";

function secretsMatch(provided) {
  if (!provided) return false;
  var providedDigest = crypto
    .createHash("sha256")
    .update(String(provided), "utf8")
    .digest();
  var configuredDigest = Buffer.from(FEED_SECRET_SHA256, "hex");
  return (
    providedDigest.length === configuredDigest.length &&
    crypto.timingSafeEqual(providedDigest, configuredDigest)
  );
}

function querySecret(req) {
  try {
    return new URL(
      req.url || "",
      "https://www.trymiroooo.com",
    ).searchParams.get("secret");
  } catch (_) {
    return null;
  }
}

async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).send("Method not allowed.");
  }

  var secret = querySecret(req);
  if (!secretsMatch(secret)) {
    return res.status(401).send("Unauthorized request.");
  }

  try {
    var upstreamUrl = new URL(UPSTREAM_FEED_URL);
    upstreamUrl.searchParams.set("secret", secret);
    var response = await fetch(upstreamUrl, {
      headers: { Accept: "text/csv" },
      cache: "no-store",
    });
    var body = await response.text();

    res.setHeader("Cache-Control", "no-store");
    res.setHeader(
      "Content-Disposition",
      response.headers.get("content-disposition") ||
        'attachment; filename="miroooo-microsoft-offline-conversions.csv"',
    );
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "text/csv; charset=utf-8",
    );
    var conversionCount = response.headers.get("x-conversion-count");
    if (conversionCount) res.setHeader("X-Conversion-Count", conversionCount);

    return res.status(response.status).send(body);
  } catch (error) {
    console.error(
      "Miroooo Microsoft Ads offline conversion proxy failed",
      error instanceof Error ? error.message : error,
    );
    return res.status(502).send("Could not generate the offline conversion feed.");
  }
}

handler._test = { secretsMatch: secretsMatch };

module.exports = handler;
