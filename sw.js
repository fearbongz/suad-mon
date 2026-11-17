/* Service worker: makes the app open and work without a connection.
   - App files (HTML/CSS/JS): network first, so a new deploy shows up
     immediately; the cached copy is only used when the network fails.
   - Images/audio: served from cache right away and refreshed in the background.
   - Supabase / LINE API calls are never touched. */
const SHELL_CACHE = "suadmon-shell-v1";   // bump to drop old app files
const ASSET_CACHE = "suadmon-assets";     // kept across versions (offline downloads live here)

const SHELL_FILES = [
  "./", "index.html", "legal.html", "style.css", "character.css", "polish.css",
  "app.js", "supabase-config.js", "manifest.webmanifest",
  "assets/favicon.png", "assets/icons/icon-192.png", "assets/icons/apple-touch-icon.png",
  "assets/hero-bg.jpg", "assets/hero-pink-female.webp", "assets/moon.webp",
  "assets/navlotus.webp", "assets/guide-heart.webp", "assets/flower-icon.webp"
];
const CDN_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com", "cdn.jsdelivr.net"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      // one missing file must not block the install
      .then(cache => Promise.all(SHELL_FILES.map(file => cache.add(file).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== SHELL_CACHE && key !== ASSET_CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

function isAppFile(url, request) {
  return request.mode === "navigate" || /\.(html|css|js|webmanifest)$/.test(url.pathname) || url.pathname.endsWith("/");
}

async function networkFirst(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    // version query strings (?v=...) change per deploy, so match on the path only
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (request.mode === "navigate") {
      const shell = await caches.match("index.html");
      if (shell) return shell;
    }
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await caches.match(request, { ignoreSearch: true });
  const refresh = fetch(request)
    .then(response => {
      // opaque responses (no-cors CDN scripts) have status 0 but are still usable
      if (response.ok || response.type === "opaque") cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);
  if (cached) return cached;
  const fresh = await refresh;
  if (fresh) return fresh;
  return Response.error();
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  if (request.headers.has("range")) return;        // let the browser stream audio/video itself
  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    if (url.pathname.endsWith("/sw.js")) return;
    event.respondWith(isAppFile(url, request) ? networkFirst(request) : staleWhileRevalidate(request, ASSET_CACHE));
    return;
  }
  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request, SHELL_CACHE));
  }
  // everything else (Supabase, LINE bot, YouTube) goes straight to the network
});
