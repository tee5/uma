document.addEventListener("DOMContentLoaded", e => {
    //Service Workerの登録
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("js/sw.js")
        .then(registration => {
            if (typeof registration.update == 'function') {
                registration.update();
            }
        })
        .catch(error => {
            console.log("Error Log: " + error);
        });
    }
});
