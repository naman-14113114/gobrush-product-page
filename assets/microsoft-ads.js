(function () {
  "use strict";

  var PRIMARY_UET_TAG_ID = "211072489";
  var PURCHASE_UET_TAG_ID = "355060364";
  var ATTRIBUTION_STORAGE_KEY = "miroooo_attribution";
  var ATTRIBUTION_KEYS = [
    "msclkid",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "source"
  ];

  function readStoredAttribution(storage) {
    try {
      return JSON.parse(storage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}");
    } catch (_) {
      return {};
    }
  }

  function persistAttribution() {
    var params = new URLSearchParams(window.location.search);
    var stored = readStoredAttribution(window.localStorage);

    ATTRIBUTION_KEYS.forEach(function (key) {
      var value = params.get(key);
      if (value) stored[key] = value.slice(0, 500);
    });

    if (!stored.landing_page) stored.landing_page = window.location.href.slice(0, 1000);
    if (!stored.referrer && document.referrer) stored.referrer = document.referrer.slice(0, 1000);

    try {
      window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(stored));
    } catch (_) {}

    try {
      window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(stored));
    } catch (_) {}

    return stored;
  }

  function initialiseUetQueue(queueName, tagId) {
    if (typeof window.UET !== "function") return;

    var pendingQueue = window[queueName] || [];
    var options = {
      ti: tagId,
      enableAutoSpaTracking: true,
      q: pendingQueue
    };

    window[queueName] = new window.UET(options);
    window[queueName].push("pageLoad");
  }

  function initialiseMicrosoftAds() {
    if (window.__mirooooMicrosoftAdsReady) return;
    window.__mirooooMicrosoftAdsReady = true;

    initialiseUetQueue("uetq", PRIMARY_UET_TAG_ID);
    initialiseUetQueue("shoppingUetq", PURCHASE_UET_TAG_ID);
  }

  persistAttribution();

  window.uetq = window.uetq || [];
  window.shoppingUetq = window.shoppingUetq || [];
  window.__mirooooMicrosoftAds = {
    primaryTagId: PRIMARY_UET_TAG_ID,
    purchaseTagId: PURCHASE_UET_TAG_ID,
    trackCheckout: function (details) {
      var payload = details || {};
      window.uetq.push("event", "begin_checkout", payload);
      window.shoppingUetq.push("event", "begin_checkout", payload);
    }
  };

  if (typeof window.UET === "function") {
    initialiseMicrosoftAds();
    return;
  }

  var existing = document.getElementById("miroooo-microsoft-uet");
  if (existing) {
    existing.addEventListener("load", initialiseMicrosoftAds, { once: true });
    return;
  }

  var script = document.createElement("script");
  script.id = "miroooo-microsoft-uet";
  script.async = true;
  script.src = "https://bat.bing.com/bat.js";
  script.addEventListener("load", initialiseMicrosoftAds, { once: true });
  document.head.appendChild(script);
})();
