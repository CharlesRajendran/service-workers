const CACHE = 'network-or-cache';

self.addEventListener("install", e => {
    console.log("Install Event Called!!");

    // while installing let's cache some files with precache function
    // waitUntil will allow you wait till the installation returning promise is resolved
    e.waitUntil(precache());
});


function precache() {
    return caches.open(CACHE).then(function(cache) {
        return cache.addAll([
            './myfile.json'
        ]);
    });
}

self.addEventListener("activate", e => {
    console.log("Activate Event Called!!");
});

self.addEventListener('fetch', e => {
    console.log("fetch from server request....");
    console.log(e);
    // this part is not working
    
    // e.respondWith(fetchFromNetwork(e.request, 400).catch(() => {
    //     console.log("Error here");
    //    servingFromCache(e.request)
    // }))
});

function fetchFromNetwork(request, timeout) {
    return new Promise((resolve, reject) => {
        let timeout = setTimeout(reject, timeout);
        console.log(request)
        fetch(request)
        .then(res => {
            clearTimeout(timeout);
            resolve(res);
        }, reject); 
    })
}

function servingFromCache(request) {
    return caches.open(CACHE)
            .then(cache => {
                return cache.match(request)
                        .then(matches => {
                            return matches || Promise.reject('no-match');
                        })
            })
}