export default function middleware(request) {
  const country = request.headers.get("x-vercel-ip-country");
  const blockedCountries = ["VN", "HK", "CN", "SG"];

  if (country && blockedCountries.includes(country.toUpperCase())) {
    return Response.redirect("https://miroooo.us", 307);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|txt|xml|webmanifest)$).*)",
  ],
};

