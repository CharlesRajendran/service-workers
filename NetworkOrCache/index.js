// verify whether the browser support service worker
if ("serviceWorker" in navigator) {
    console.log(`${navigator.userAgent} Support Service Worker!!`);
    window.addEventListener('load', () => {

        // register the service worker onload
        navigator.serviceWorker
        .register("./service-worker.js", {
            // here we can specify the folder where the file's needs to be cached...
            scope: './'
        })
        .then(reg => {
            console.log("service worker registered successfully....")
            console.log(reg)
        })
        .catch(err => {
            console.log(err)
        })
    });
}

// to add users
window.addEventListener('load', () => {
    fetch('./myfile.json')
    .then(res => res.json())
    .then( response => {
        renderUsers(response.users);
    })
});

// utility function to render the list of users
function renderUsers(users) {
    let ul = document.createElement("ul");

    users.forEach(user => {
        let li = document.createElement('li');
        ul.appendChild(li);
        let text = document.createTextNode(user);
        li.appendChild(text);
    });
    
    $content = document.getElementById('content');
    $content.appendChild(ul);
}
