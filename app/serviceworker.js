let cache = 'LoDiDa';
let filesToCache = [
  'index.html'
];

self.addEventListener('install', function (e) {
  console.log("Install");
  console.info("I am here");
  e.waitUntil(
    caches.open(cache).then(function (cache) {
      return cache.addAll(filesToCache).then(() => console.log('Assets added to cache'))
      .catch(err => console.log('Error while fetching assets', err));
    })
  )
});

self.addEventListener('activate', event => {
  console.log("activate!");
});

self.addEventListener('fetch', function(event) {
  console.log("fetch", event.request);
});


