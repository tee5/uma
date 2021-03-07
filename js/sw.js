//キャッシュ名
var CACHE_NAME  = "tee5/uma";

//キャッシュするファイル名
var urlsToCache = [
    "/uma/index.html",
    "/uma/js/main.js",
    "/uma/css/style.css",
    "/uma/data/events.json",
];

//インストール時処理
self.addEventListener("install", event => {
    event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
});

// フェッチ時のキャッシュロード処理（2019/07/18 更新）
self.addEventListener("fetch", event => {
    event.respondWith(
        caches
        .match(event.request)
        .then(response => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
