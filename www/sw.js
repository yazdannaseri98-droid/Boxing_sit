// Service worker ساده برای نسخه‌ی وب (PWA): فایل‌های خود اپ اول از شبکه گرفته می‌شن (نسخه‌ی تازه) و اگه اینترنت نبود از کش.
// درخواست‌های سرور API و ویدیوها (دامنه‌ی دیگه) دست‌نخورده از شبکه می‌رن.
const CACHE = "naseri-web-v26";
self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin || req.headers.has("range")) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then((r) => r || caches.match("./")))
  );
});
