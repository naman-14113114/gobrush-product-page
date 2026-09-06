// Vercel Serverless Function: /api/checkout/prepare
const plusbaseOrigin = "https://muuhu.onshopbase.com";
const publicCheckoutDomain = "https://miroooo.us";
const validDiscountCodes = ["MIROOOO", "MIROOOO10", "FREE2HEADS", "FREE4HEADS", "2-BRUSH-BUNDLE-SPECIAL", "3-BRUSH-BUNDLE-OFFER"];

const passthroughAttributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "msclkid",
  "gclid",
  "fbclid",
  "source",
];

function buildPlusbaseAttributionProperties(attribution) {
  const properties = [];
  passthroughAttributionKeys.forEach((key) => {
    const value = attribution?.[key];
    if (value) {
      properties.push({ name: `_blfm_${key}`, value: String(value).slice(0, 500) });
    }
  });
  return properties;
}

function appendAttributionToUrl(href, attribution) {
  try {
    const url = new URL(href);
    if (attribution && typeof attribution === "object") {
      passthroughAttributionKeys.forEach((key) => {
        const val = attribution[key];
        if (val && !url.searchParams.has(key)) {
          url.searchParams.set(key, String(val));
        }
      });
    }
    return url.toString();
  } catch {
    return href;
  }
}

function normalizeDiscountCode(code) {
  return String(code || "").trim().toUpperCase();
}

function collectRequestedDiscountCodes(body) {
  const candidates = [];
  if (Array.isArray(body.discountCodes)) {
    candidates.push(...body.discountCodes);
  }
  if (typeof body.discountCode === "string" && body.discountCode.trim()) {
    candidates.push(...body.discountCode.split(","));
  }

  const matchedCodes = candidates
    .map(normalizeDiscountCode)
    .filter((code) => validDiscountCodes.includes(code));

  return [...new Set(matchedCodes)];
}

async function fetchCheckoutInfo(checkoutToken) {
  const url = new URL(
    `/api/checkout/${encodeURIComponent(checkoutToken)}/next/new-info.json`,
    publicCheckoutDomain
  );
  url.searchParams.set("fields", "total,discounts,items,shipping,tipping");
  url.searchParams.set("country", "");
  url.searchParams.set("province", "");
  url.searchParams.set("zip_code", "null");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "x-lang": "en-us",
      "x-shopbase-checkout-token": checkoutToken,
      "x-source-page": "checkout",
    },
  });
  const data = await response.json().catch(() => null);

  if (!response.ok || data?.code !== 200) {
    throw new Error("Could not read PlusBase checkout info.");
  }

  return data;
}

function extractActiveDiscountCodes(infoResponse) {
  const result = infoResponse?.result || {};
  const info = result.info || {};
  const codes = [];

  [
    info.discount_code,
    info.discount?.code,
    info.applied_discount?.code,
  ].forEach((code) => {
    const normalized = normalizeDiscountCode(code);
    if (normalized) codes.push(normalized);
  });

  [
    result.discounts,
    info.applied_discounts,
    info.discount_applications,
    info.discounts,
  ].forEach((list) => {
    if (!Array.isArray(list)) return;
    list.forEach((item) => {
      const normalized = normalizeDiscountCode(item?.code || item?.discount_code || item?.title);
      if (normalized) codes.push(normalized);
    });
  });

  return [...new Set(codes)];
}

async function applyDiscountCodesToCheckout(checkoutToken, discountCodes) {
  const results = [];
  if (!discountCodes.length) {
    return {
      initialized: false,
      results,
      activeDiscountCodes: [],
      missingDiscountCodes: [],
      unexpectedDiscountCodes: [],
    };
  }

  let checkoutInfo;
  try {
    checkoutInfo = await fetchCheckoutInfo(checkoutToken);
  } catch (error) {
    return {
      initialized: false,
      results,
      activeDiscountCodes: [],
      missingDiscountCodes: [...discountCodes],
      unexpectedDiscountCodes: [],
      initializationError: error?.message || "CHECKOUT_INITIALIZATION_FAILED",
    };
  }

  let activeDiscountCodes = extractActiveDiscountCodes(checkoutInfo);

  for (const code of discountCodes) {
    if (activeDiscountCodes.includes(code)) {
      results.push({
        code,
        applied: true,
        status: 200,
        plusbaseCode: 200,
        errorCode: "",
        alreadyActive: true,
      });
      continue;
    }

    try {
      const response = await fetch(`${publicCheckoutDomain}/api/checkout/${encodeURIComponent(checkoutToken)}/next/apply-coupon.json`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "x-lang": "en-us",
          "x-shopbase-checkout-token": checkoutToken,
          "x-source-page": "checkout",
        },
        body: JSON.stringify({
          code,
          is_coupon_from_share_able_link: false,
        }),
      });
      const data = await response.json().catch(() => null);
      const errorCode = data?.error_code || data?.result?.error_code || "";
      const accepted = response.ok && data?.code === 200 && data?.result === true && !errorCode;

      if (accepted) {
        checkoutInfo = await fetchCheckoutInfo(checkoutToken);
        activeDiscountCodes = extractActiveDiscountCodes(checkoutInfo);
      }

      results.push({
        code,
        applied: accepted && activeDiscountCodes.includes(code),
        status: response.status,
        plusbaseCode: data?.code ?? null,
        errorCode,
      });
    } catch (error) {
      results.push({
        code,
        applied: false,
        status: 0,
        plusbaseCode: null,
        errorCode: error?.message || "NETWORK_ERROR",
      });
    }
  }

  try {
    activeDiscountCodes = extractActiveDiscountCodes(await fetchCheckoutInfo(checkoutToken));
  } catch (_) {}

  const missingDiscountCodes = discountCodes.filter((code) => !activeDiscountCodes.includes(code));
  const unexpectedDiscountCodes = activeDiscountCodes.filter(
    (code) => validDiscountCodes.includes(code) && !discountCodes.includes(code)
  );

  return {
    initialized: true,
    results,
    activeDiscountCodes,
    missingDiscountCodes,
    unexpectedDiscountCodes,
  };
}

function appendCookies(current, response) {
  const setCookies = response.headers.getSetCookie
    ? response.headers.getSetCookie()
    : response.headers.get("set-cookie")
      ? [response.headers.get("set-cookie")]
      : [];

  if (!setCookies.length) return current;

  const cookieMap = new Map();
  current
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .forEach((part) => {
      const [name] = part.split("=");
      cookieMap.set(name, part);
    });

  setCookies.forEach((cookie) => {
    const pair = cookie.split(";")[0];
    const [name] = pair.split("=");
    if (name && pair) {
      cookieMap.set(name, pair);
    }
  });

  return Array.from(cookieMap.values()).join("; ");
}

async function createPlusbaseCheckout(items, attribution) {
  let cookie = "";

  // 1. Initialize Cart
  const createResponse = await fetch(`${plusbaseOrigin}/api/checkout/next/cart.json`, {
    method: "POST",
    headers: {
      accept: "application/json",
    },
  });
  cookie = appendCookies(cookie, createResponse);

  const createJson = await createResponse.json();
  const cartToken = createJson?.result?.token;
  const checkoutToken = createJson?.result?.checkout_token;

  if (!createResponse.ok || !cartToken || !checkoutToken) {
    throw new Error("Could not create PlusBase cart.");
  }

  // 2. Add Each Selected Item / Variant to the Cart
  const properties = buildPlusbaseAttributionProperties(attribution);

  for (const item of items) {
    const addResponse = await fetch(
      `${plusbaseOrigin}/api/checkout/next/cart.json?cart_token=${encodeURIComponent(cartToken)}`,
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          ...(cookie ? { cookie } : {}),
        },
        body: JSON.stringify({
          cartItem: {
            product_id: Number(item.productId),
            variant_id: Number(item.variantId),
            qty: Number(item.quantity) || 1,
            properties: properties,
            metadata: {
              image_preview_id: "",
            },
          },
          from: "add-to-cart",
        }),
      }
    );
    cookie = appendCookies(cookie, addResponse);

    const addJson = await addResponse.json();
    if (!addResponse.ok || addJson?.code !== 0) {
      throw new Error(`Could not add variant ${item.variantId} to PlusBase cart.`);
    }
  }

  return {
    checkoutToken,
    checkoutUrl: `${publicCheckoutDomain}/checkouts/${checkoutToken}`,
  };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const attribution = body.attribution || {};

    let items = [];

    if (Array.isArray(body.items) && body.items.length > 0) {
      items = body.items.map((it) => ({
        productId: it.productId || "1000000675113473",
        variantId: it.variantId,
        quantity: Math.max(1, Math.round(Number(it.quantity) || 1)),
      }));
    } else if (Array.isArray(body.variantIds) && body.variantIds.length > 0) {
      const defaultProductId = body.productId || "1000000675113473";
      items = body.variantIds.map((vId) => ({
        productId: defaultProductId,
        variantId: vId,
        quantity: 1,
      }));
    } else {
      items = [
        {
          productId: body.productId || "1000000675113473",
          variantId: body.variantId || "1000020700958564",
          quantity: Math.max(1, Math.round(Number(body.quantity) || 1)),
        },
      ];
    }

    const discountCodes = collectRequestedDiscountCodes(body);

    const checkout = await createPlusbaseCheckout(items, attribution);
    const discountApplication = await applyDiscountCodesToCheckout(checkout.checkoutToken, discountCodes);
    const finalUrl = appendAttributionToUrl(checkout.checkoutUrl, attribution);

    if (
      discountApplication.missingDiscountCodes.length > 0 ||
      discountApplication.unexpectedDiscountCodes.length > 0
    ) {
      return res.status(502).json({
        error: "PlusBase checkout promos did not match the cart.",
        checkoutToken: checkout.checkoutToken,
        requestedDiscountCodes: discountCodes,
        appliedDiscountCodes: discountApplication.activeDiscountCodes,
        missingDiscountCodes: discountApplication.missingDiscountCodes,
        unexpectedDiscountCodes: discountApplication.unexpectedDiscountCodes,
        discountApplyResults: discountApplication.results,
        discountApplyInitialized: discountApplication.initialized,
      });
    }

    return res.status(200).json({
      checkoutToken: checkout.checkoutToken,
      checkoutUrl: finalUrl,
      requestedDiscountCodes: discountCodes,
      appliedDiscountCodes: discountApplication.activeDiscountCodes,
      unexpectedDiscountCodes: discountApplication.unexpectedDiscountCodes,
      discountApplyResults: discountApplication.results,
      discountApplyInitialized: discountApplication.initialized,
    });
  } catch (error) {
    console.error("PlusBase checkout preparation failed:", error);
    return res.status(500).json({
      error: error.message || "Failed to create checkout session",
    });
  }
};
