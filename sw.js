/* Estus Health — Boundaries run-sheet service worker.
   Keeps the run-sheet working offline once loaded: mid-webinar wifi
   hiccups can't take the sheet down. Navigations are network-first
   (fresh content when online), static assets are cache-first. */

var VERSION = "estus-runsheet-v2.0.0";

var SHELL = [
  "/",
  "/index.html",
  "/takeaway",
  "/takeaway.html",
  "/404.html",
  "/manifest.webmanifest",
  "/fonts/fonts.css",
  "/fonts/Barlow-400.woff2",
  "/fonts/Barlow-500.woff2",
  "/fonts/Barlow-600.woff2",
  "/fonts/Barlow-700.woff2",
  "/fonts/BarlowSemiCondensed-500.woff2",
  "/fonts/BarlowSemiCondensed-600.woff2",
  "/fonts/BarlowSemiCondensed-700.woff2",
  "/fonts/Oswald-400.woff2",
  "/fonts/Oswald-500.woff2",
  "/fonts/Oswald-600.woff2",
  "/fonts/Oswald-700.woff2",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-512.png",
  "/icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(VERSION).then(function (cache) {
      /* add each asset individually so one miss (e.g. /takeaway on a
         plain file server without clean URLs) can't fail the install */
      return Promise.all(
        SHELL.map(function (url) {
          return cache.add(url).catch(function () {});
        })
      );
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== VERSION; })
            .map(function (k) { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    /* network-first for pages: always fresh when online, cached when not */
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(VERSION).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (m) {
          return m || caches.match("/index.html");
        });
      })
    );
    return;
  }

  /* cache-first for static assets, with background fill */
  e.respondWith(
    caches.match(req).then(function (m) {
      if (m) return m;
      return fetch(req).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
