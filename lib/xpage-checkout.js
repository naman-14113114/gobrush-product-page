export const XPAGE_STORE_URL = "https://8e9c584880e3.myxpage.shop";

export const XPAGE_VARIANTS = {
  // Miroooo X1 Brushes (Product: a2ce5266-8250-4f79-a587-d819e549bcd6)
  x1_silver: "a2ce5279-19c8-4e56-8253-a06d4b7a3bd7",
  x1_pink: "a2ce527a-ac20-4a6d-888a-ada52bc9d509",
  x1_grey: "a2ce527c-3b55-45a4-b832-9915d637ba8b",
  // Miroooo X1 Heads (Product: a2ce5266-8250-4f79-a587-d819e549bcd6 / Heads variant)
  x1_heads: "a2ce5282-7966-4891-a418-861b4c279974",

  // Miroooo X2 Brushes (Product: a2d08cc2-373f-4ab4-9e57-241d29efb2a2)
  x2_silver: "a2d08cd4-6781-49a7-ad82-f3d52ba0270f",
  x2_grey: "a2d08cd9-0845-4697-ba03-495c14032931",
  x2_pink: "a2d08cdd-d5d3-47da-a294-ea8da721fc31",
  // Miroooo X2 Heads (Product: a2d0cb1d-c4f6-492e-a72d-27369d15ec0c)
  x2_heads: "a2d0cb1d-dfcf-425d-9251-7792053c08b8",
};

export const XPAGE_MIROOOO_VARIANTS = {
  ...XPAGE_VARIANTS,
  silver: XPAGE_VARIANTS.x1_silver,
  pink: XPAGE_VARIANTS.x1_pink,
  grey: XPAGE_VARIANTS.x1_grey,
  gray: XPAGE_VARIANTS.x1_grey,
  heads: XPAGE_VARIANTS.x1_heads,
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
    if (variantIdRaw === XPAGE_VARIANTS.x2_heads || allText.includes(XPAGE_VARIANTS.x2_heads)) {
      targetVariantId = XPAGE_VARIANTS.x2_heads;
    } else if (variantIdRaw === XPAGE_VARIANTS.x2_pink || allText.includes(XPAGE_VARIANTS.x2_pink)) {
      targetVariantId = XPAGE_VARIANTS.x2_pink;
    } else if (variantIdRaw === XPAGE_VARIANTS.x2_grey || allText.includes(XPAGE_VARIANTS.x2_grey)) {
      targetVariantId = XPAGE_VARIANTS.x2_grey;
    } else if (variantIdRaw === XPAGE_VARIANTS.x2_silver || allText.includes(XPAGE_VARIANTS.x2_silver)) {
      targetVariantId = XPAGE_VARIANTS.x2_silver;
    } else if (variantIdRaw === XPAGE_VARIANTS.x1_heads || allText.includes(XPAGE_VARIANTS.x1_heads)) {
      targetVariantId = XPAGE_VARIANTS.x1_heads;
    } else if (variantIdRaw === XPAGE_VARIANTS.x1_pink || allText.includes(XPAGE_VARIANTS.x1_pink)) {
      targetVariantId = XPAGE_VARIANTS.x1_pink;
    } else if (variantIdRaw === XPAGE_VARIANTS.x1_grey || allText.includes(XPAGE_VARIANTS.x1_grey)) {
      targetVariantId = XPAGE_VARIANTS.x1_grey;
    } else if (variantIdRaw === XPAGE_VARIANTS.x1_silver || allText.includes(XPAGE_VARIANTS.x1_silver)) {
      targetVariantId = XPAGE_VARIANTS.x1_silver;
    }
    // 2. Brush Heads Mapping (Differentiate X2 Heads vs X1 Heads)
    else if (
      variantIdRaw === "1000020718937117" ||
      productIdRaw === "1000000675616058" ||
      handleRaw === "miroooo-x2-heads" ||
      allText.includes("1000020718937117") ||
      allText.includes("1000000675616058") ||
      allText.includes("x2-heads") ||
      (allText.includes("x2") && (allText.includes("head") || allText.includes("dupont") || allText.includes("bristle")))
    ) {
      targetVariantId = XPAGE_VARIANTS.x2_heads;
    } else if (
      variantIdRaw === "1000020710139724" ||
      productIdRaw === "1000000675471182" ||
      handleRaw === "miroooo-x1-heads" ||
      handleRaw === "miroooo-x-heads" ||
      allText.includes("1000020710139724") ||
      allText.includes("1000000675471182") ||
      allText.includes("head") ||
      allText.includes("dupont") ||
      allText.includes("precision") ||
      allText.includes("replacement") ||
      allText.includes("bristle")
    ) {
      targetVariantId = XPAGE_VARIANTS.x1_heads;
    }
    // 3. Miroooo X2 Toothbrush Mapping
    else if (
      handleRaw === "miroooo-x2" ||
      productIdRaw === "1000000675072187" ||
      variantIdRaw === "1000020700182882" ||
      variantIdRaw === "1000020700182883" ||
      variantIdRaw === "1000020700182884" ||
      allText.includes("1000000675072187") ||
      allText.includes("1000020700182882") ||
      allText.includes("1000020700182883") ||
      allText.includes("1000020700182884") ||
      allText.includes("miroooo-x2") ||
      allText.includes("miroooo x2") ||
      allText.includes("x2")
    ) {
      if (
        variantIdRaw === "1000020700182882" ||
        colorRaw.includes("pink") ||
        colorRaw.includes("rose") ||
        allText.includes("pink") ||
        allText.includes("rose")
      ) {
        targetVariantId = XPAGE_VARIANTS.x2_pink;
      } else if (
        variantIdRaw === "1000020700182883" ||
        colorRaw.includes("grey") ||
        colorRaw.includes("gray") ||
        colorRaw.includes("dark") ||
        colorRaw.includes("black") ||
        colorRaw.includes("charcoal") ||
        colorRaw.includes("slate") ||
        allText.includes("grey") ||
        allText.includes("gray")
      ) {
        targetVariantId = XPAGE_VARIANTS.x2_grey;
      } else {
        targetVariantId = XPAGE_VARIANTS.x2_silver;
      }
    }
    // 4. Miroooo X1 Toothbrush Mapping (or Default fallback)
    else {
      if (
        variantIdRaw === "1000020700958562" ||
        colorRaw.includes("pink") ||
        colorRaw.includes("rose") ||
        allText.includes("pink") ||
        allText.includes("rose")
      ) {
        targetVariantId = XPAGE_VARIANTS.x1_pink;
      } else if (
        variantIdRaw === "1000020700958564" ||
        colorRaw.includes("grey") ||
        colorRaw.includes("gray") ||
        colorRaw.includes("dark") ||
        colorRaw.includes("black") ||
        colorRaw.includes("charcoal") ||
        colorRaw.includes("slate") ||
        allText.includes("grey") ||
        allText.includes("gray")
      ) {
        targetVariantId = XPAGE_VARIANTS.x1_grey;
      } else {
        targetVariantId = XPAGE_VARIANTS.x1_silver;
      }
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
    throw new Error("No valid Miroooo variants found in cart.");
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
  XPAGE_VARIANTS,
  XPAGE_MIROOOO_VARIANTS,
  ALLOWED_ATTRIBUTION_KEYS,
  loadXpageSession,
  mapCartToXpageVariants,
  buildCheckoutUrl,
  createXpageCartCheckout,
};
