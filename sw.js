const CACHE_NAME = 'ps-digital-v10'; // Suba a versão sempre que mudar o código
const assets = [
  './',
  'index.html',
  'PSdigital.png',
  'manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Usamos um log para você conferir no console do F12 se o cache funcionou
      console.log('Cacheando arquivos assets');
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // Estratégia: Tenta rede primeiro, se falhar (offline), busca no cache
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});