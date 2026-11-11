// Forge — service worker : permet l'installation et le fonctionnement hors ligne.
// Pour forcer une mise à jour du cache, change simplement le numéro de version ci-dessous.
const VERSION = 'forge-v4-1';
const SHELL = ['./', './Khilliann.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './arcane-duo.jpg.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) =>
      // allSettled : un fichier absent (ex. l'image de fond) ne bloque pas l'installation
      Promise.allSettled(SHELL.map((u) => cache.add(u)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isPage = req.mode === 'navigate' || (sameOrigin && url.pathname.endsWith('.html'));

  if (isPage) {
    // Page : le réseau d'abord (les mises à jour arrivent tout de suite), le cache si hors ligne.
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() =>
        caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('./Khilliann.html', { ignoreSearch: true }))
      )
    );
    return;
  }

  // Le reste (icônes, image, polices) : le cache d'abord, puis le réseau (et on mémorise).
  event.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res && (res.status === 200 || res.type === 'opaque')) {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
      }
      return res;
    }).catch(() => hit))
  );
});
