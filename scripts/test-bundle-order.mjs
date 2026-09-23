const STORE_URL = "https://8e9c584880e3.myxpage.shop";

async function testAllBundles() {
  const initRes = await fetch(`${STORE_URL}/?currency=GBP`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-GB,en;q=0.9",
    }
  });

  const setCookieHeaders = initRes.headers.getSetCookie
    ? initRes.headers.getSetCookie()
    : [initRes.headers.get("set-cookie")].filter(Boolean);
  let xsrfToken = "";
  for (const c of setCookieHeaders) {
    const m = c.match(/XSRF-TOKEN=([^;]+)/);
    if (m) xsrfToken = decodeURIComponent(m[1]);
  }
  const cookieHeader = setCookieHeaders.map(c => c.split(';')[0]).join('; ');

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json, text/plain, */*",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Origin": STORE_URL,
    "Referer": `${STORE_URL}/?currency=GBP`,
    "Cookie": cookieHeader || "xp_currency=GBP",
  };

  if (xsrfToken) {
    headers["X-XSRF-TOKEN"] = xsrfToken;
    headers["X-CSRF-TOKEN"] = xsrfToken;
  }

  // 1. Miroooo X2 Buy 1 (Single Pack - £69)
  console.log("Testing Miroooo X2 Buy 1...");
  const res1 = await fetch(`${STORE_URL}/create-bundle-order`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      bundle_option_id: "a2d0d131-33fd-4d08-aadd-c56b2e8dc30d",
      bundle_selected_variants: {
        conditions: {
          "a2d0d131-3a2d-401b-a068-e6ea64a8328c": ["a2d08cd4-6781-49a7-ad82-f3d52ba0270f"] // Silver
        },
        offered: {}
      }
    })
  });
  console.log("X2 Buy 1 result:", await res1.json());

  // 2. Miroooo X2 Buy 2 (Double Pack - £128 + 1 Free Heads)
  console.log("\nTesting Miroooo X2 Buy 2...");
  const res2 = await fetch(`${STORE_URL}/create-bundle-order`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      bundle_option_id: "a2d0d131-3f1f-47c6-bfdb-112fd97f8952",
      bundle_selected_variants: {
        conditions: {
          "a2d0d131-4852-4cb4-9e86-21276808da2a": [
            "a2d08cdd-d5d3-47da-a294-ea8da721fc31", // Pink
            "a2d08cd4-6781-49a7-ad82-f3d52ba0270f"  // Silver
          ]
        },
        offered: {
          "a2d0d131-4466-49b5-9f62-ccad592042d5": ["a2d0cb1d-dfcf-425d-9251-7792053c08b8"] // Heads
        }
      }
    })
  });
  console.log("X2 Buy 2 result:", await res2.json());

  // 3. Miroooo X2 Buy 3 (Triple Pack - £177 + 2 Free Heads)
  console.log("\nTesting Miroooo X2 Buy 3...");
  const res3 = await fetch(`${STORE_URL}/create-bundle-order`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      bundle_option_id: "a2d0d131-4ca9-4fd6-a859-bb73df7c1550",
      bundle_selected_variants: {
        conditions: {
          "a2d0d131-578d-454f-ba0c-676788e8cfbb": [
            "a2d08cdd-d5d3-47da-a294-ea8da721fc31", // Pink
            "a2d08cd9-0845-4697-ba03-495c14032931", // Grey
            "a2d08cd4-6781-49a7-ad82-f3d52ba0270f"  // Silver
          ]
        },
        offered: {
          "a2d0d131-54b9-4323-97ce-7ddeb48f554e": [
            "a2d0cb1d-dfcf-425d-9251-7792053c08b8",
            "a2d0cb1d-dfcf-425d-9251-7792053c08b8"
          ]
        }
      }
    })
  });
  console.log("X2 Buy 3 result:", await res3.json());
}

testAllBundles().catch(console.error);
