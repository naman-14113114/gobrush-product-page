export default function middleware() {
  // Country blocking and redirection removed
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|txt|xml|webmanifest)$).*)",
  ],
};

