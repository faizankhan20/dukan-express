// Dukan Express — Service Worker
// This file is REQUIRED for "Install" to work at all. Without it, browsers
// will never consider the site installable, and the Install button/banner
// will never actually do anything (even though it might still show up).

const CACHE_NAME = 'dukan-express-v1';

// Basic app shell — safe minimal list. Add more of your own file names here
// later if you want offline support for them (e.g. more images).
const APP_SHELL = [
  './',
  './index.html',
  './logo.png',
  './site.webmanifest'
];

// Install: cache the app shell. If any file in the list is missing/misnamed,
// this whole step fails — so keep this list accurate to your real files.
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch((err) => console.log('SW install cache error:', err))
  );
});

// Activate: clean up old caches from previous versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((name) => name !== CACHE_NAME)
             .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: try the network first (so people always see fresh content/prices),
// fall back to cache only if offline. This avoids the common bug where a
// service worker keeps serving old/stale pages forever.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
