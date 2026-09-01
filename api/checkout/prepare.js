// Vercel Serverless Function: /api/checkout/prepare
const plusbaseOrigin = "https://muuhu.onshopbase.com";
const publicCheckoutDomain = "https://miroooo.us";

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

function appendDiscountCodeToUrl(href, discountCode) {
  if (!discountCode) return href;
  try {
    const url = new URL(href);
    url.searchParams.set("discount", discountCode);
    return url.toString();
  } catch {
    return href;
  }
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
    const rawDiscountCode = String(body.discountCode || "").trim().toUpperCase();
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

    const hasX2 = items.some((it) => String(it.productId) === "1000000675072187" || String(it.productId) === "1000000664011618" || it.productId === "miroooo-x2");
    const discountCode = (rawDiscountCode === "MIROOOO10" && hasX2) ? "MIROOOO10" : "";

    const checkout = await createPlusbaseCheckout(items, attribution);
    const finalUrl = appendDiscountCodeToUrl(checkout.checkoutUrl, discountCode);

    return res.status(200).json({
      checkoutToken: checkout.checkoutToken,
      checkoutUrl: finalUrl,
    });
  } catch (error) {
    console.error("PlusBase checkout preparation failed:", error);
    return res.status(500).json({
      error: error.message || "Failed to create checkout session",
    });
  }
};
