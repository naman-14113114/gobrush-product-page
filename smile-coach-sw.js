const CACHE_NAME = "miroooo-smile-coach-v1";
const APP_SHELL = [
  "/smile-coach",
  "/smile-coach.html",
  "/smile-coach.webmanifest",
  "/assets/smile-coach.css?v=1",
  "/assets/smile-coach.js?v=1",
  "/favicon.png",
  "/assets_ref/x/gallery/Miroooo_x_Silver-1.webp",
  "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp",
  "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-dupont-bristle-head-macro.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((name) => name.startsWith("miroooo-smile-coach-") && name !== CACHE_NAME).map((name) => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate" && url.pathname.startsWith("/smile-coach")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("/smile-coach", copy));
          return response;
        })
        .catch(() => caches.match("/smile-coach"))
    );
    return;
  }

  if (url.pathname.startsWith("/assets/smile-coach") || url.pathname.startsWith("/assets_ref/")) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      }))
    );
  }
});
