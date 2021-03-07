document.addEventListener("DOMContentLoaded", e => {
    //Service Workerの登録
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("js/sw.js")
        .then(function (registration) {
            if (typeof registration.update == 'function') {
                registration.update();
            }
        })
        .catch(function (error) {
            console.log("Error Log: " + error);
        });
    }
});
