//キャッシュ名
var CACHE_NAME  = "tee5/uma";

//キャッシュするファイル名
var urlsToCache = [
    "/index.html",
    "/js/main.js",
    "/css/style.js",
    "/data/events.json",
];

//インストール時処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
});

// フェッチ時のキャッシュロード処理（2019/07/18 更新）
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
        .match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
