var cacheName = 'petstore-v1';
var cacheFiles = ['index.html',
    'product.js',
    'petstore1.webmanifest',
    'images/yarn.jpg',
    'images/cat-litter.jpg',
    'images/laser-pointer.jpg',
    'images/cat-house.jpg',
    'images/icon-store-512.png'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(caches.open(cacheName).then((cache) => {
        console.log('[Service Worker] Caching all the files');
        return cache.addAll(cacheFiles);
    }));
});
// self.addEventListener('install', (e) => {
//     console.log('[Service Worker] Install');
//     e.waitUntil(caches.open(cacheName).then((cache) => {
//         console.log('[Service Worker] Caching all the files');
//         return cache.addAll(cacheFiles);
//     }));
// });


self.addEventListener('fetch', function(e) {
    e.respondWith(caches.match(e.request).then(function(r) {
        // Download the file if it is not in the cache,
        return r || fetch(e.request).then(function(response) {
            // add the new file to cache
            return caches.open(cacheName).then(function(cache) {
                cache.put(e.request, response.clone());
                return response;
            });
        });
    }));
});