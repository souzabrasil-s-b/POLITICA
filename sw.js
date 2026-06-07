// Service Worker — Urna Simulada AM 2026 — v3
const CACHE = 'urna-am-2026-v3';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Remove TODOS os caches antigos
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// NETWORK FIRST para tudo — nunca serve cache stale
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Não intercepta requests externos (Firebase, Google Fonts, CDN)
  if(url.origin !== self.location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Só cacheia se for sucesso
        if(response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Offline: tenta cache
        return caches.match(e.request).then(cached => {
          if(cached) return cached;
          if(e.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html');
          }
        });
      })
  );
});
