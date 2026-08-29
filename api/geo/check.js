export default function handler(req, res) {
  const country = (req.headers["x-vercel-ip-country"] || "").toUpperCase();
  const blockedCountries = ["VN", "HK", "CN", "SG", "US"];
  const isBlocked = blockedCountries.includes(country);

  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.status(200).json({
    country,
    blocked: isBlocked,
    redirectUrl: isBlocked ? "https://miroooo.us" : null,
  });
}

