self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('spotless-spin-pos-v1').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json'
      ]).catch(() => {
        return cache.add('./index.html');
      });
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
