export const XPAGE_STORE_URL = "https://8e9c584880e3.myxpage.shop";

export const XPAGE_MIROOOO_VARIANTS = {
  silver: "a2ce5279-19c8-4e56-8253-a06d4b7a3bd7",
  pink: "a2ce527a-ac20-4a6d-888a-ada52bc9d509",
  grey: "a2ce527c-3b55-45a4-b832-9915d637ba8b",
  gray: "a2ce527c-3b55-45a4-b832-9915d637ba8b",
  "dark grey": "a2ce527c-3b55-45a4-b832-9915d637ba8b",
  heads: "a2ce5282-7966-4891-a418-861b4c279974",
  "miroooo-heads": "a2ce5282-7966-4891-a418-861b4c279974",
  "miroooo-x1-heads": "a2ce5282-7966-4891-a418-861b4c279974",
  "brush-heads": "a2ce5282-7966-4891-a418-861b4c279974",
  "extra-heads": "a2ce5282-7966-4891-a418-861b4c279974",
};

export const ALLOWED_ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "msclkid",
  "gclid",
  "fbclid",
  "ttclid",
];

function sanitizeHeaderValue(value) {
  if (!value) return "";
  return String(value).replace(/[\r\n]/g, "").trim();
}

/**
 * Fetch initial session to extract XSRF-TOKEN and cookies from XPage
 */
export async function loadXpageSession(currency = "GBP") {
  const url = `${XPAGE_STORE_URL}/?currency=${encodeURIComponent(currency)}`;
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.9",
    Origin: XPAGE_STORE_URL,
    Referer: url,
  };

  const response = await fetch(url, {
    method: "GET",
    headers,
    redirect: "manual",
  });

  const setCookieHeaders = response.headers.getSetCookie
    ? response.headers.getSetCookie()
    : [response.headers.get("set-cookie")].filter(Boolean);

  let xsrfToken = "";
  for (const c of setCookieHeaders) {
    const match = c.match(/XSRF-TOKEN=([^;]+)/);
    if (match) {
      xsrfToken = decodeURIComponent(match[1]);
    }
  }

  const cookieHeader = setCookieHeaders.map((c) => c.split(";")[0]).join("; ");

  return {
    xsrfToken,
    cookieHeader,
    setCookieHeaders,
  };
}

/**
 * Map cart items from Miroooo cart to XPage line items
 */
export function mapCartToXpageVariants(cartLines = []) {
  const xpageCart = [];

  for (const line of cartLines) {
    const qty = Number(line.quantity) || 1;
    if (qty <= 0) continue;

    const color = (line.color || line.variant || "").toString().toLowerCase().trim();
    const productId = (line.productId || line.id || "").toString().toLowerCase().trim();

    let variantId = null;

    if (productId.includes("head") || color.includes("head")) {
      variantId = XPAGE_MIROOOO_VARIANTS["heads"];
    } else if (color.includes("pink")) {
      variantId = XPAGE_MIROOOO_VARIANTS["pink"];
    } else if (color.includes("grey") || color.includes("gray") || color.includes("dark")) {
      variantId = XPAGE_MIROOOO_VARIANTS["grey"];
    } else if (color.includes("silver") || color.includes("white")) {
      variantId = XPAGE_MIROOOO_VARIANTS["silver"];
    } else {
      // Default to Silver if unmapped brush
      variantId = XPAGE_MIROOOO_VARIANTS["silver"];
    }

    if (variantId) {
      const existing = xpageCart.find((i) => i.variant_id === variantId);
      if (existing) {
        existing.quantity += qty;
      } else {
        xpageCart.push({
          quantity: qty,
          variant_id: variantId,
        });
      }
    }
  }

  return xpageCart;
}

/**
 * Append discount and clean attribution to checkout URL
 */
export function buildCheckoutUrl(baseCheckoutUrl, discountCode = "", attribution = {}, currency = "GBP") {
  const url = new URL(baseCheckoutUrl);

  if (currency) {
    url.searchParams.set("currency", currency);
  }

  if (discountCode) {
    url.searchParams.set("discount", discountCode);
  }

  if (attribution && typeof attribution === "object") {
    for (const key of ALLOWED_ATTRIBUTION_KEYS) {
      const val = attribution[key];
      if (val && typeof val === "string") {
        url.searchParams.set(key, sanitizeHeaderValue(val));
      }
    }
  }

  return url.toString();
}

/**
 * Create tokenized XPage Cart Checkout session
 */
export async function createXpageCartCheckout({
  cart = [],
  discountCode = "",
  attribution = {},
  currency = "GBP",
}) {
  const session = await loadXpageSession(currency);

  const xpageLines = mapCartToXpageVariants(cart);
  if (!xpageLines.length) {
    throw new Error("No valid Miroooo X1 variants found in cart.");
  }

  const setCartUrl = `${XPAGE_STORE_URL}/set-cart?checkout=true`;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    Origin: XPAGE_STORE_URL,
    Referer: `${XPAGE_STORE_URL}/?currency=${encodeURIComponent(currency)}`,
    Cookie: session.cookieHeader || `xp_currency=${currency}`,
  };

  if (session.xsrfToken) {
    headers["X-XSRF-TOKEN"] = session.xsrfToken;
    headers["X-CSRF-TOKEN"] = session.xsrfToken;
  }

  const payload = {
    cart: xpageLines,
  };

  const setCartRes = await fetch(setCartUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    redirect: "manual",
  });

  const setCartCookies = setCartRes.headers.getSetCookie
    ? setCartRes.headers.getSetCookie()
    : [setCartRes.headers.get("set-cookie")].filter(Boolean);

  const allCookies = [...session.setCookieHeaders, ...setCartCookies]
    .map((c) => c.split(";")[0])
    .join("; ");

  const setCartText = await setCartRes.text();
  let setCartJson = null;
  try {
    setCartJson = JSON.parse(setCartText);
  } catch {}

  let baseCheckoutUrl = null;

  // Resolve tokenized checkout URL by calling GET /checkout with session cookies
  const checkoutEndpoint = setCartJson?.checkout_url || `${XPAGE_STORE_URL}/checkout`;

  const checkoutRes = await fetch(checkoutEndpoint, {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      Origin: XPAGE_STORE_URL,
      Referer: `${XPAGE_STORE_URL}/?currency=${encodeURIComponent(currency)}`,
      Cookie: allCookies,
    },
    redirect: "manual",
  });

  const location = checkoutRes.headers.get("location");
  if (location && location.includes("/checkout/")) {
    baseCheckoutUrl = location.startsWith("http") ? location : `${XPAGE_STORE_URL}${location}`;
  } else if (setCartJson && setCartJson.checkout_url && setCartJson.checkout_url.includes("/checkout/")) {
    baseCheckoutUrl = setCartJson.checkout_url;
  } else {
    baseCheckoutUrl = location || checkoutEndpoint;
  }

  const finalCheckoutUrl = buildCheckoutUrl(baseCheckoutUrl, discountCode, attribution, currency);

  return {
    ok: true,
    checkoutUrl: finalCheckoutUrl,
    cart: xpageLines,
  };
}

export default {
  XPAGE_STORE_URL,
  XPAGE_MIROOOO_VARIANTS,
  ALLOWED_ATTRIBUTION_KEYS,
  loadXpageSession,
  mapCartToXpageVariants,
  buildCheckoutUrl,
  createXpageCartCheckout,
};
