export const XPAGE_STORE_URL = "https://8e9c584880e3.myxpage.shop";
export const XPAGE_LANDING_URLS = {
  x1: "https://x1.miroooo.us",
  x2: "https://offer.miroooo.us",
};

export const XPAGE_VARIANTS = {
  // Miroooo X1 Brushes (Product: a2ce5266-8250-4f79-a587-d819e549bcd6)
  x1_silver: "a2ce5279-19c8-4e56-8253-a06d4b7a3bd7",
  x1_pink: "a2ce527a-ac20-4a6d-888a-ada52bc9d509",
  x1_grey: "a2ce527c-3b55-45a4-b832-9915d637ba8b",
  // Miroooo X1 Heads (Product: a2d0cb07-bb83-4f46-96ec-5d0de9e663b2)
  x1_heads: "a2d0cb07-ee63-4e45-b245-7bb90f494e2e",

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

export const XPAGE_BUNDLES = {
  x2: {
    id: "a2d0d131-2f3a-4f9c-a8a7-70a398be8b39",
    buy1: {
      optionId: "a2d0d131-33fd-4d08-aadd-c56b2e8dc30d",
      conditionId: "a2d1e8dd-f806-4426-875c-7bc39fa38aa8",
    },
    buy2: {
      optionId: "a2d0d131-3f1f-47c6-bfdb-112fd97f8952",
      conditionId: "a2d1e8de-5452-48cd-a8a0-f7e5a7a960e7",
      offeredId: "a2d1e8de-5a4f-474d-be9c-2047532dd4d4",
      headsVariant: "a2d0cb1d-dfcf-425d-9251-7792053c08b8",
    },
    buy3: {
      optionId: "a2d0d131-4ca9-4fd6-a859-bb73df7c1550",
      conditionId: "a2d1e8de-574d-4bbf-b5c8-2bafab95d980",
      offeredId: "a2d1e8de-5dc7-4975-8ceb-f01541cd924a",
      headsVariant: "a2d0cb1d-dfcf-425d-9251-7792053c08b8",
    },
    promoBuy1: { optionId: "a2d1e8dd-8ff5-4a93-970f-fe69b2fda5ca", conditionId: "a2d1e8dd-98ad-4f34-b6ca-1a78efb2b305" },
    promoBuy2: { optionId: "a2d1e8dd-8a4d-4f52-8495-7740cc7ba3cd", conditionId: "a2d1e8dd-a0ca-4751-af29-9c20bccfc641", offeredId: "a2d1e8dd-92da-4a57-b475-bbe1b8e45e36", headsVariant: XPAGE_VARIANTS.x2_heads },
    promoBuy3: { optionId: "a2d1e8dd-9455-4386-a6f8-e98cc347b10d", conditionId: "a2d1e8dd-aa09-4e0a-b83b-65c37a73105c", offeredId: "a2d1e8dd-a669-4a9b-9105-1404fddd0fe5", headsVariant: XPAGE_VARIANTS.x2_heads },
  },
  x1: {
    id: "a2cea7c5-4c36-4f88-a757-4f93d767dfe3",
    buy1: {
      optionId: "a2cea7c5-54d1-4b8a-bcdc-6a7770bb62cc",
      conditionId: "a2d1e9eb-7f9c-4a27-b5f0-75ea0ea2ad98",
    },
    buy2: {
      optionId: "a2cea7c5-639d-47bd-b9d9-f376089d336b",
      conditionId: "a2d1e9ec-0bea-46ae-a97b-a6c1a1daa769",
      offeredId: "a2d1e9ec-1323-4ee6-bd58-59a340599a06",
      headsVariant: "a2d0cb07-ee63-4e45-b245-7bb90f494e2e",
    },
    buy3: {
      optionId: "a2cea7c5-6ea0-484b-bb28-a74048d6c9bd",
      conditionId: "a2d1e9ec-0bea-432c-9368-af97106e3da8",
      offeredId: "a2d1e9ec-1323-4b10-bc87-8cb9a0f89b9b",
      headsVariant: "a2d0cb07-ee63-4e45-b245-7bb90f494e2e",
    },
    promoBuy1: { optionId: "a2d1e9eb-8511-4ec9-9c2d-5559fd3d4455", conditionId: "a2d1e9eb-8d8f-43ac-8c23-7eef45852ff9" },
    promoBuy2: { optionId: "a2d1e9eb-60b7-4009-886f-e7aa6988e2f0", conditionId: "a2d1e9eb-70af-4484-abbf-db000b9707ba", offeredId: "a2d1e9eb-699f-4020-bf86-b65d77b15f0b", headsVariant: XPAGE_VARIANTS.x1_heads },
    promoBuy3: { optionId: "a2d1e9eb-6e56-47ee-a83d-76c1464e737f", conditionId: "a2d1e9eb-79e0-4cd0-9aee-e7143eaa0a15", offeredId: "a2d1e9eb-76f2-43eb-8c08-d8ee35ce770f", headsVariant: XPAGE_VARIANTS.x1_heads },
  },
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
export async function loadXpageSession(currency = "GBP", product = "x2") {
  const origin = product === "store" ? XPAGE_STORE_URL : XPAGE_LANDING_URLS[product];
  if (!origin) throw new Error("Unknown Miroooo XPage offer.");
  const url = `${origin}/?currency=${encodeURIComponent(currency)}`;
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.9",
    Origin: origin,
    Referer: url,
  };

  const response = await fetch(url, {
    method: "GET",
    headers,
    redirect: "error",
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error("XPage offer could not be loaded.");
  const html = await response.text();

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

  const csrfToken = html.match(/["']X-CSRF-Token["']:\s*["']([^"']+)["']/)?.[1] || "";
  const landingPageId = html.match(/orderData\.landing_page_id\s*=\s*["']([\da-f-]{36})["']/)?.[1] || "";
  const expectedBundleId = XPAGE_BUNDLES[product]?.id;
  let bundle = null;
  for (const match of expectedBundleId ? html.matchAll(/\bx-data\s*=\s*(["'])([\s\S]*?)\1/g) : []) {
    if (!match[2].includes(expectedBundleId)) continue;
    try {
      const parsed = JSON.parse(match[2].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
      if (parsed.bundle?.id === expectedBundleId) bundle = parsed.bundle;
    } catch { /* Other x-data attributes are expressions. */ }
  }
  if (product !== "store" && (!csrfToken || !landingPageId || bundle?.status !== "ACTIVE")) {
    throw new Error("The published Miroooo XPage offer is unavailable.");
  }
  return {
    origin,
    url,
    csrfToken,
    landingPageId,
    bundle,
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
    const qty = line.quantity === undefined ? 1 : Number(line.quantity);
    if (!Number.isSafeInteger(qty) || qty < 1) {
      throw new Error("Checkout item quantity must be a positive whole number.");
    }

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
    } else if (
      variantIdRaw === XPAGE_VARIANTS.x1_heads ||
      variantIdRaw === "a2ce5282-7966-4891-a418-861b4c279974" ||
      allText.includes(XPAGE_VARIANTS.x1_heads) ||
      allText.includes("a2ce5282-7966-4891-a418-861b4c279974")
    ) {
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
      productIdRaw === "a2d0cb1d-c4f6-492e-a72d-27369d15ec0c" ||
      handleRaw === "miroooo-x2-heads" ||
      allText.includes("1000020718937117") ||
      allText.includes("1000000675616058") ||
      allText.includes("a2d0cb1d-c4f6-492e-a72d-27369d15ec0c") ||
      allText.includes("x2-heads") ||
      (allText.includes("x2") && (allText.includes("head") || allText.includes("dupont") || allText.includes("bristle")))
    ) {
      targetVariantId = XPAGE_VARIANTS.x2_heads;
    } else if (
      variantIdRaw === "1000020710139724" ||
      productIdRaw === "1000000675471182" ||
      productIdRaw === "a2d0cb07-bb83-4f46-96ec-5d0de9e663b2" ||
      handleRaw === "miroooo-x1-heads" ||
      handleRaw === "miroooo-x-heads" ||
      allText.includes("1000020710139724") ||
      allText.includes("1000000675471182") ||
      allText.includes("a2d0cb07-bb83-4f46-96ec-5d0de9e663b2") ||
      allText.includes("x1-heads") ||
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
    // 4. Miroooo X1 Toothbrush Mapping
    else if (
      handleRaw === "miroooo-x" || handleRaw === "miroooo-x1" ||
      productIdRaw === "1000000675113473" || productIdRaw === "miroooo-x" || productIdRaw === "miroooo-x1" ||
      ["1000020700958562", "1000020700958563", "1000020700958564"].includes(variantIdRaw) ||
      allText.includes("miroooo x1") || allText.includes("miroooo-x1")
    ) {
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

    if (!targetVariantId) throw new Error("Cart contains an unknown Miroooo product or variant.");
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

// XPage creates the complimentary head sets from the selected bundle option.
// The storefront may also show them as cart lines, so do not count those lines
// as extra toothbrushes or add the gift a second time.
export function detectBundlePayload(cartLines = [], discountCode = "") {
  const brushes = { x1: [], x2: [] };
  const brushCounts = { x1: 0, x2: 0 };
  const freeHeads = { x1: 0, x2: 0 };
  const paidHeads = { x1: 0, x2: 0 };

  for (const line of cartLines) {
    const mapped = mapCartToXpageVariants([line]);
    if (mapped.length !== 1) throw new Error("Could not identify a checkout item.");
    const { variant_id: variantId, quantity } = mapped[0];
    const family = Object.entries({
      x1: [XPAGE_VARIANTS.x1_silver, XPAGE_VARIANTS.x1_pink, XPAGE_VARIANTS.x1_grey],
      x2: [XPAGE_VARIANTS.x2_silver, XPAGE_VARIANTS.x2_pink, XPAGE_VARIANTS.x2_grey],
    }).find(([, variants]) => variants.includes(variantId))?.[0];
    if (family) {
      brushCounts[family] += quantity;
      // Only one-, two-, and three-brush carts can use a published bundle.
      // Do not allocate an array proportional to an arbitrary cart quantity.
      if (brushCounts[family] <= 3) brushes[family].push(...Array(quantity).fill(variantId));
      continue;
    }
    const headFamily = variantId === XPAGE_VARIANTS.x1_heads ? "x1" : "x2";
    const isFree = line.isFree === true || /(?:^|:)free(?:$|:)/i.test(String(line.id || ""));
    (isFree ? freeHeads : paidHeads)[headFamily] += quantity;
  }

  if (brushCounts.x1 && brushCounts.x2) {
    return null;
  }
  const product = brushCounts.x1 ? "x1" : brushCounts.x2 ? "x2" : null;
  if (!product) {
    return null;
  }
  const quantity = brushCounts[product];
  if (quantity > 3) {
    return null;
  }
  const expectedGift = Math.max(0, quantity - 1);
  const otherProduct = product === "x1" ? "x2" : "x1";
  if (freeHeads[otherProduct] || (freeHeads[product] !== 0 && freeHeads[product] !== expectedGift)) {
    return null;
  }
  if (paidHeads[product] || paidHeads[otherProduct]) {
    return null;
  }

  const hasWelcomeCode = ["MIROOOO10", "MIROOOO"].includes(String(discountCode).trim().toUpperCase());
  const option = XPAGE_BUNDLES[product][`${hasWelcomeCode ? "promoBuy" : "buy"}${quantity}`];
  return {
    bundle_option_id: option.optionId,
    bundle_selected_variants: {
      conditions: { [option.conditionId]: brushes[product] },
      offered: expectedGift ? { [option.offeredId]: Array(expectedGift).fill(option.headsVariant) } : {},
    },
  };
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

export function brandedCheckoutUrl(href, product = "x2") {
  if (typeof href !== "string") throw new Error("XPage did not return a checkout session.");
  const url = new URL(href);
  if (url.origin !== XPAGE_STORE_URL || url.username || url.password ||
      !/\/checkout\/[\da-f]{64}$/i.test(url.pathname)) {
    throw new Error("XPage returned an unexpected checkout destination.");
  }
  const brandedOrigin = XPAGE_LANDING_URLS[product];
  if (!brandedOrigin) throw new Error("Unknown Miroooo checkout destination.");
  // Both published domains belong to this XPage store. The checkout session
  // path is portable, so customers stay on the matching Miroooo domain.
  return new URL(url.pathname, brandedOrigin).toString();
}

function validatePublishedBundle(session, product, payload, isPromo) {
  const selected = session.bundle.options.find((option) => option.id === payload.bundle_option_id);
  const quantity = Object.values(payload.bundle_selected_variants.conditions)[0]?.length || 0;
  const expected = XPAGE_BUNDLES[product][`${isPromo ? "promoBuy" : "buy"}${quantity}`];
  // Saving an offer in the admin regenerates condition and gift IDs. Resolve
  // them from the published option instead of sending IDs from an older edit.
  const condition = selected?.conditions?.find((item) => item.quantity === quantity);
  const offered = expected?.offeredId
    ? selected?.offered?.find((item) => item.quantity === quantity - 1 &&
        item.product?.variants?.some((variant) => variant.id === expected.headsVariant))
    : null;
  const variants = condition?.product?.variants || [];
  const chosen = Object.values(payload.bundle_selected_variants.conditions)[0] || [];
  const expectedPromoAmount = { 1: 10, 2: 16.52, 3: 22.96 }[quantity];
  if (!expected || !selected || selected.id !== expected.optionId || !condition ||
      condition.quantity !== quantity || condition.product?.status !== "ACTIVE" ||
      !chosen.every((id) => variants.some((variant) => variant.id === id && variant.is_visible)) ||
      (isPromo && (selected.discount_type !== "PERCENTAGE" ||
        Number(selected.discount_amount) !== expectedPromoAmount)) ||
      (quantity > 1 && (!offered || offered.quantity !== quantity - 1 ||
        offered.product?.status !== "ACTIVE" || offered.discount_type !== "PERCENTAGE" ||
        Number(offered.discount_amount) !== 100 ||
        !offered.product.variants.some((variant) => variant.id === expected.headsVariant && variant.is_visible)))) {
    throw new Error("The published XPage bundle has changed; checkout was not created.");
  }
  return {
    bundle_option_id: selected.id,
    bundle_selected_variants: {
      conditions: { [condition.id]: chosen },
      offered: offered ? { [offered.id]: Array(quantity - 1).fill(expected.headsVariant) } : {},
    },
  };
}

/**
 * Create tokenized XPage Cart Checkout session
 */
export async function createXpageCartCheckout({
  cart = [],
  discountCode = "",
  attribution = {},
  currency = "GBP",
  forceStandardCart = false,
}) {
  const isPromo = ["MIROOOO10", "MIROOOO"].includes(String(discountCode).trim().toUpperCase());
  const bundlePayload = forceStandardCart ? null : detectBundlePayload(cart, discountCode);

  if (bundlePayload) {
    const product = Object.values(XPAGE_BUNDLES.x1).some((value) => value?.optionId === bundlePayload.bundle_option_id)
      ? "x1" : "x2";
    const session = await loadXpageSession(currency, product);
    const publishedPayload = validatePublishedBundle(session, product, bundlePayload, isPromo);
    const response = await fetch(`${session.origin}/create-bundle-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": session.csrfToken,
        Origin: session.origin,
        Referer: session.url,
        Cookie: `xp_currency=${currency}${session.cookieHeader ? `; ${session.cookieHeader}` : ""}`,
      },
      body: JSON.stringify({ ...publishedPayload, landing_page_id: session.landingPageId }),
      redirect: "error",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`XPage bundle checkout failed (${response.status}).`);
    const data = await response.json();
    if (data.status !== "success") throw new Error("XPage could not prepare the selected bundle.");
    return {
      ok: true,
      checkoutUrl: buildCheckoutUrl(brandedCheckoutUrl(data.checkout_url, product), "", attribution, currency),
      cart: mapCartToXpageVariants(cart),
      isBundle: true,
      isPromoBundle: isPromo,
    };
  }

  // Ordinary checkout cannot price a storefront-only gift as free. Omit gift
  // placeholders rather than silently turning them into paid line items.
  const paidCart = cart.filter((line) => line.isFree !== true &&
    !/(?:^|:)free(?:$|:)/i.test(String(line.id || "")));
  const xpageLines = mapCartToXpageVariants(paidCart);
  if (!xpageLines.length) {
    throw new Error("No valid Miroooo variants found in cart.");
  }

  const session = await loadXpageSession(currency, "store");
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
    signal: AbortSignal.timeout(15000),
  });
  if (!setCartRes.ok) throw new Error(`XPage cart checkout failed (${setCartRes.status}).`);

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

  const x1Variants = new Set([
    XPAGE_VARIANTS.x1_pink, XPAGE_VARIANTS.x1_grey, XPAGE_VARIANTS.x1_silver, XPAGE_VARIANTS.x1_heads,
  ]);
  const product = xpageLines.every((line) => x1Variants.has(line.variant_id)) ? "x1" : "x2";
  // This hosted cart checkout ignores discount query parameters. Do not put a
  // code in the URL that appears to be applied when the payable total is not.
  const finalCheckoutUrl = buildCheckoutUrl(brandedCheckoutUrl(baseCheckoutUrl, product), "", attribution, currency);

  return {
    ok: true,
    checkoutUrl: finalCheckoutUrl,
    cart: xpageLines,
    isBundle: false,
  };
}

export default {
  XPAGE_STORE_URL,
  XPAGE_VARIANTS,
  XPAGE_MIROOOO_VARIANTS,
  XPAGE_BUNDLES,
  ALLOWED_ATTRIBUTION_KEYS,
  loadXpageSession,
  detectBundlePayload,
  mapCartToXpageVariants,
  buildCheckoutUrl,
  createXpageCartCheckout,
};
