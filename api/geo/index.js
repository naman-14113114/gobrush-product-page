export default function handler(req, res) {
  const queryCountry = req.query?.country ? String(req.query.country) : "";
  const headerCountry =
    req.headers["x-vercel-ip-country"] ||
    req.headers["cf-ipcountry"] ||
    req.headers["x-country-code"] ||
    req.headers["x-country"] ||
    "";

  const rawCountry = (queryCountry || headerCountry || "").toString().trim().toUpperCase();
  const isMorocco = rawCountry === "MA" || rawCountry === "MOROCCO";

  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.status(200).json({
    country: rawCountry,
    blocked: isMorocco,
    isMorocco,
    message: isMorocco
      ? "The checkout has not been connected, and no order has been placed."
      : null,
    redirectUrl: null,
  });
}
