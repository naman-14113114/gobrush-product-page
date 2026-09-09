export default function handler(req, res) {
  const country = (req.headers["x-vercel-ip-country"] || "").toUpperCase();

  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.status(200).json({
    country,
    blocked: false,
    redirectUrl: null,
  });
}

