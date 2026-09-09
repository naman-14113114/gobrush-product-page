export default function middleware(request) {
  const country = request.headers.get("x-vercel-ip-country");
  const blockedCountries = ["VN", "HK", "CN", "SG", "US"];

  if (country && blockedCountries.includes(country.toUpperCase())) {
    return new Response(
      '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>403 Forbidden</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#080909;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;text-align:center;padding:24px}h1{font-size:32px;margin:0 0 12px;font-weight:700}p{color:#888;font-size:16px;line-height:1.5;margin:0;max-width:440px}</style></head><body><div><h1>403 Forbidden</h1><p>Access Denied. Access to this website is restricted in your region.</p></div></body></html>',
      {
        status: 403,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
          "set-cookie": "miroooo_cart=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0",
        },
      }
    );
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|txt|xml|webmanifest)$).*)",
  ],
};

