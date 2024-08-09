let back = document.getElementById("back");
back.addEventListener("click", ()=>{
    window.location.href = "app.html";
})
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    window.location.href="app.html";
});
