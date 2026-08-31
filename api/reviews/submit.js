// Vercel Serverless Function: /api/reviews/submit
const fs = require("fs");
const path = require("path");

const WEB3FORMS_ACCESS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY || "c5701bc7-0fe8-4bbf-bda7-af778b74c0fd";

function sendJson(res, statusCode, data) {
  if (typeof res.status === "function" && typeof res.json === "function") {
    return res.status(statusCode).json(data);
  }
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  return res.end(JSON.stringify(data));
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  try {
    let payload = req.body;
    if (typeof payload === "string") {
      try {
        payload = JSON.parse(payload);
      } catch (e) {
        payload = {};
      }
    }

    const {
      productId = "miroooo-x",
      name = "Customer",
      email = "",
      rating = 5,
      variant = "Color: Grey",
      title = "",
      body = "",
      images = [],
    } = payload || {};

    const now = new Date();
    const dateIST = now.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
    const timeIST = now.toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata" });
    const submittedAtIST = `${dateIST} ${timeIST} IST`;
    const isX2 = String(productId).toLowerCase().includes("x2");
    const productName = isX2 ? "Miroooo Brush X2 Flagship" : "Miroooo Brush X1 Sonic";

    const reviewEntry = {
      id: `org-rev-${Date.now()}`,
      name: String(name).trim() || "Verified Buyer",
      email: String(email).trim(),
      country: "Verified Customer",
      rating: Math.max(1, Math.min(5, Number(rating) || 5)),
      date: dateIST,
      dateIST: submittedAtIST,
      displayDate: "Just now",
      variant: String(variant || "Color: Grey").trim(),
      title: String(title).trim(),
      body: String(body).trim(),
      images: Array.isArray(images) ? images : [],
      helpful: 0,
      verified: true,
      status: "pending_review",
      source: "storefront_review_form",
    };

    // 1. Send Instant Email Notification via Web3Forms
    try {
      const emailPayload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `[New Customer Review] ${rating}★ for ${isX2 ? "Brush X2" : "Brush X1"} - "${title || name}"`,
        from_name: `Miroooo Reviews (${reviewEntry.name})`,
        email: reviewEntry.email || "no-reply@trymiroooo.com",
        Product: productName,
        Rating: `${reviewEntry.rating} / 5 Stars`,
        "Customer Name": reviewEntry.name,
        "Customer Email": reviewEntry.email || "Not provided",
        "Chosen Variant": reviewEntry.variant,
        "Review Headline": reviewEntry.title,
        "Review Content": reviewEntry.body,
        "Submitted At": submittedAtIST,
        message: `Product: ${productName}\nRating: ${reviewEntry.rating}/5 Stars\nAuthor: ${reviewEntry.name}\nEmail: ${reviewEntry.email || "Not provided"}\nVariant: ${reviewEntry.variant}\nHeadline: ${reviewEntry.title}\nContent: ${reviewEntry.body}\nSubmitted: ${submittedAtIST}`
      };

      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(emailPayload),
      }).catch((emailErr) => console.warn("Web3Forms email dispatch error:", emailErr));
    } catch (notifyErr) {
      console.warn("Could not dispatch Web3Forms notification:", notifyErr);
    }

    // 2. Append to local file if writable
    const filename = isX2 ? "org_miroooo-x2-reviews.js" : "org_miroooo-reviews.js";
    const varName = isX2 ? "ORG_MIROOOO_X2_REVIEWS" : "ORG_MIROOOO_REVIEWS";
    const filePath = path.join(process.cwd(), "assets_ref", filename);

    let existingReviews = [];
    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        const jsonMatch = fileContent.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          existingReviews = JSON.parse(jsonMatch[0]);
        }
      }
    } catch (readErr) {
      existingReviews = [];
    }

    existingReviews.unshift(reviewEntry);

    const updatedContent = `// Standalone Organic Customer Submissions for ${isX2 ? "Brush X2" : "Brush X1"} (Not rendered on storefront)
const ${varName} = ${JSON.stringify(existingReviews, null, 2)};

if (typeof module !== 'undefined') {
  module.exports = ${varName};
}
`;

    try {
      fs.writeFileSync(filePath, updatedContent, "utf8");
    } catch (writeErr) {
      // Ignored if running in read-only serverless environment
    }

    return sendJson(res, 200, {
      success: true,
      message: "Review submitted successfully",
      reviewId: reviewEntry.id,
    });
  } catch (err) {
    console.error("Review submission error:", err);
    return sendJson(res, 500, {
      success: false,
      error: "Failed to process review submission",
    });
  }
};
