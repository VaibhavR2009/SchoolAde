const dropdownInside = document.getElementById("dropdownInside");
dropdownInside.style.display="none";
const dropdownToggle = document.getElementById("dropdownIcon");
const dropdownToggle1 = document.getElementById("features");
const resumeManager = document.getElementById("Rheader");
dropdownToggle.addEventListener("click", ()=>{
    if (localStorage.getItem("open")!=="open") {
        dropdownInside.style.display="block";
        localStorage.setItem("open", "open");
    } else {
        dropdownInside.style.display="none";
        localStorage.setItem("open", "closed");
    }
});
dropdownToggle1.addEventListener("click", ()=>{
    if (localStorage.getItem("open")!=="open") {
        dropdownInside.style.display="block";
        localStorage.setItem("open", "open");
    } else {
        dropdownInside.style.display="none";
        localStorage.setItem("open", "closed");
    }
});
document.onclick=function(e) {
    if (e.target.id!=="dropdownInside" && e.target.id!=="dropdownIcon"&& e.target.id!=="features") {
        dropdownInside.style.display="none";
        localStorage.setItem("open", "closed");
    }
}
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("title").style.fontSize = "30px";
    document.getElementById("top").style.height = "50px";
    document.getElementById("title").style.marginTop = "-30px";
    document.getElementById("icon").style.height = "50px";
    document.getElementById("icon").style.marginTop = "20px";
    document.getElementById("icon").style.marginLeft = "-70px";
  } else {
    document.getElementById("title").style.fontSize = "40px";
    document.getElementById("top").style.height = "80px";
    document.getElementById("icon").style.height = "90px";
    document.getElementById("icon").style.marginTop = "2px";
    document.getElementById("icon").style.marginLeft = "10px";
    document.getElementById("features").style.marginLeft = "-20px";
  }
}
resumeManager.addEventListener("click", ()=>{
    window.location.href = "login.html";
});
const resumeManager2 = document.getElementById("resumeManager");
resumeManager2.addEventListener("click", ()=>{
    window.location.href = "login.html";
});
const calendizy = document.getElementById("Hcalendar");
calendizy.addEventListener("click", ()=>{
    window.location.href = "calendizy.html";
});
const calendizy2 = document.getElementById("calendizy");
calendizy2.addEventListener("click", ()=>{
    window.location.href = "calendizy.html";
});
const cathiko = document.getElementById("Hcathiko");
cathiko.addEventListener("click", ()=>{
    window.location.href = "cathiko.html";
});
const cathiko2 = document.getElementById("cathiko");
cathiko2.addEventListener("click", ()=>{
    window.location.href = "cathiko.html";
});