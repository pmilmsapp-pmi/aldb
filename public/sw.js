/* sw.js - minimal service worker */
const CACHE_NAME = 'aldebaran-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        '/',
        '/manifest.webmanifest',
        '/icon-192.png',
        '/icon-512.png',
      ])
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Cache only GET requests
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});