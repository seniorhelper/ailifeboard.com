/* AI Lifeboard · offline-first app shell */
const V = 'ailb-v1'; const CORE = ['/', '/index.html', '/js/app.js', '/js/core.js', '/js/lifetools.js', '/js/aou-money.js', '/manifest.webmanifest', '/images/icon.svg'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => { const u = new URL(e.request.url); if (u.origin !== location.origin || e.request.method !== 'GET') return; e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(V).then(cc => cc.put(e.request, c)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('/')))); });
