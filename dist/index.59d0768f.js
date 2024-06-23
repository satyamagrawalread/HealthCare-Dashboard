async function loadHTML(selector, url) {
    return fetch(url).then((response)=>response.text()).then((data)=>{
        document.querySelector(selector).innerHTML = data;
    }).catch((error)=>console.error("Error loading HTML:", error));
}

//# sourceMappingURL=index.59d0768f.js.map
