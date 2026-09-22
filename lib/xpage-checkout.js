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

    const variantIdRaw = (line.variant_id || line.variantId || "").toString().toLowerCase().trim();
    const productIdRaw = (line.productId || line.product_id || "").toString().toLowerCase().trim();
    const idRaw = (line.id || "").toString().toLowerCase().trim();
    const handleRaw = (line.productHandle || line.handle || "").toString().toLowerCase().trim();
    const titleRaw = (line.title || line.name || "").toString().toLowerCase().trim();
    const colorRaw = (line.color || line.variant || "").toString().toLowerCase().trim();

    const allText = `${variantIdRaw} ${productIdRaw} ${idRaw} ${handleRaw} ${titleRaw} ${colorRaw}`.toLowerCase();

    let targetVariantId = null;

    // 1. Direct XPage Variant ID match
    if (variantIdRaw === XPAGE_MIROOOO_VARIANTS.heads || allText.includes(XPAGE_MIROOOO_VARIANTS.heads)) {
      targetVariantId = XPAGE_MIROOOO_VARIANTS.heads;
    } else if (variantIdRaw === XPAGE_MIROOOO_VARIANTS.pink || allText.includes(XPAGE_MIROOOO_VARIANTS.pink)) {
      targetVariantId = XPAGE_MIROOOO_VARIANTS.pink;
    } else if (variantIdRaw === XPAGE_MIROOOO_VARIANTS.grey || allText.includes(XPAGE_MIROOOO_VARIANTS.grey)) {
      targetVariantId = XPAGE_MIROOOO_VARIANTS.grey;
    } else if (variantIdRaw === XPAGE_MIROOOO_VARIANTS.silver || allText.includes(XPAGE_MIROOOO_VARIANTS.silver)) {
      targetVariantId = XPAGE_MIROOOO_VARIANTS.silver;
    }
    // 2. Known PlusBase Heads IDs or textual indication of heads
    else if (
      variantIdRaw === "1000020710139724" ||
      variantIdRaw === "1000020718937117" ||
      productIdRaw === "1000000675471182" ||
      productIdRaw === "1000000675616058" ||
      allText.includes("1000020710139724") ||
      allText.includes("1000020718937117") ||
      allText.includes("1000000675471182") ||
      allText.includes("1000000675616058") ||
      allText.includes("head") ||
      allText.includes("dupont") ||
      allText.includes("precision") ||
      allText.includes("replacement") ||
      allText.includes("bristle")
    ) {
      targetVariantId = XPAGE_MIROOOO_VARIANTS.heads;
    }
    // 3. Known PlusBase Pink IDs or color
    else if (
      variantIdRaw === "1000020700958562" ||
      variantIdRaw === "1000020700182882" ||
      allText.includes("1000020700958562") ||
      allText.includes("1000020700182882") ||
      colorRaw.includes("pink") ||
      colorRaw.includes("rose") ||
      allText.includes("pink") ||
      allText.includes("rose")
    ) {
      targetVariantId = XPAGE_MIROOOO_VARIANTS.pink;
    }
    // 4. Known PlusBase Grey IDs or color
    else if (
      variantIdRaw === "1000020700958564" ||
      variantIdRaw === "1000020700182883" ||
      allText.includes("1000020700958564") ||
      allText.includes("1000020700182883") ||
      colorRaw.includes("grey") ||
      colorRaw.includes("gray") ||
      colorRaw.includes("dark") ||
      colorRaw.includes("black") ||
      colorRaw.includes("charcoal") ||
      colorRaw.includes("slate") ||
      allText.includes("grey") ||
      allText.includes("gray") ||
      allText.includes("dark grey") ||
      allText.includes("dark gray")
    ) {
      targetVariantId = XPAGE_MIROOOO_VARIANTS.grey;
    }
    // 5. Known PlusBase Silver IDs or color
    else if (
      variantIdRaw === "1000020700958563" ||
      variantIdRaw === "1000020700182884" ||
      allText.includes("1000020700958563") ||
      allText.includes("1000020700182884") ||
      colorRaw.includes("silver") ||
      colorRaw.includes("white") ||
      allText.includes("silver") ||
      allText.includes("white")
    ) {
      targetVariantId = XPAGE_MIROOOO_VARIANTS.silver;
    }
    // 6. Default fallback for brush
    else {
      targetVariantId = XPAGE_MIROOOO_VARIANTS.silver;
    }

    if (targetVariantId) {
      const existing = xpageCart.find((i) => i.variant_id === targetVariantId);
      if (existing) {
        existing.quantity += qty;
      } else {
        xpageCart.push({
          quantity: qty,
          variant_id: targetVariantId,
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
