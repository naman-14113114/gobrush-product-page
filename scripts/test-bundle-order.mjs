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
  // 4. Miroooo X1 Buy 1 (Single Pack - £59)
  console.log("\nTesting Miroooo X1 Buy 1...");
  const res4 = await fetch(`${STORE_URL}/create-bundle-order`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      bundle_option_id: "a2cea7c5-54d1-4b8a-bcdc-6a7770bb62cc",
      bundle_selected_variants: {
        conditions: {
          "a2d0d6fb-da2c-4087-87c4-8194c4d7d26a": ["a2ce5279-19c8-4e56-8253-a06d4b7a3bd7"] // Silver
        },
        offered: {}
      }
    })
  });
  console.log("X1 Buy 1 result:", await res4.json());

  // 5. Miroooo X1 Buy 2 (Double Pack - £108 + 1 Free Heads)
  console.log("\nTesting Miroooo X1 Buy 2...");
  const res5 = await fetch(`${STORE_URL}/create-bundle-order`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      bundle_option_id: "a2cea7c5-639d-47bd-b9d9-f376089d336b",
      bundle_selected_variants: {
        conditions: {
          "a2d0d6fc-3df7-46a9-8f18-ce24955a72f8": [
            "a2ce527a-ac20-4a6d-888a-ada52bc9d509", // Pink
            "a2ce5279-19c8-4e56-8253-a06d4b7a3bd7"  // Silver
          ]
        },
        offered: {
          "a2d0d6fc-436f-4c9d-8cec-e4573ded2236": ["a2d0cb07-ee63-4e45-b245-7bb90f494e2e"] // Heads
        }
      }
    })
  });
  console.log("X1 Buy 2 result:", await res5.json());

  // 6. Miroooo X1 Buy 3 (Triple Pack - £147 + 2 Free Heads)
  console.log("\nTesting Miroooo X1 Buy 3...");
  const res6 = await fetch(`${STORE_URL}/create-bundle-order`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      bundle_option_id: "a2cea7c5-6ea0-484b-bb28-a74048d6c9bd",
      bundle_selected_variants: {
        conditions: {
          "a2d0d6fc-4602-42a5-ae05-14966f426615": [
            "a2ce527a-ac20-4a6d-888a-ada52bc9d509", // Pink
            "a2ce527c-3b55-45a4-b832-9915d637ba8b", // Grey
            "a2ce5279-19c8-4e56-8253-a06d4b7a3bd7"  // Silver
          ]
        },
        offered: {
          "a2d0d6fc-4ab5-4215-99c3-8cd18e72d1e6": [
            "a2d0cb07-ee63-4e45-b245-7bb90f494e2e",
            "a2d0cb07-ee63-4e45-b245-7bb90f494e2e"
          ]
        }
      }
    })
  });
  console.log("X1 Buy 3 result:", await res6.json());
}

testAllBundles().catch(console.error);
