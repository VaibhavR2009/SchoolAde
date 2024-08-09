import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {child, get} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyBpySPk9vc3jtN_0bIbqI50ioprQLXRFjI",
    authDomain: "congressional--app-challenge.firebaseapp.com",
    projectId: "congressional--app-challenge",
    storageBucket: "congressional--app-challenge.appspot.com",
    messagingSenderId: "1056286679952",
    appId: "1:1056286679952:web:2885df18d2bdea50948915",
    measurementId: "G-NNXRE6P1XS"
};
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const userName = document.getElementById('userName');
const email = document.getElementById('email')
const logoutButton=document.getElementById('logout');
let accept = document.getElementById("Accept1");
let acceptDiv = document.getElementById("accept");
let noAccept = document.getElementById("NoAccept");
const db = getDatabase();
acceptDiv.style.display = "none";
function retrieveData(uid) {
    const appref = ref(db);
    get(child(appref, 'users/' + uid)).then ((snapshot)=>{
    if (snapshot.exists()) {
        console.log("Retrieving Data");
        console.log(snapshot.val().acccomplishments);
        console.log(snapshot.val().validated);
        console.log(snapshot.val().placeholders);
        console.log(snapshot.val().urls);
        console.log(snapshot.val().num);
        let accs = snapshot.val().acccomplishments;
        let validated = snapshot.val().validated;
        let placeholders = snapshot.val().placeholders;
        let urls = snapshot.val().urls;
        let num = snapshot.val().num;
        if (validated==="yes") {
            acceptDiv.style.display = "none";
        } else {
            acceptDiv.style.display = "block";
        }
        localStorage.setItem("accs", accs);
        localStorage.setItem("validated", validated);
        localStorage.setItem("placeholders", placeholders);
        localStorage.setItem("urls", urls);
        localStorage.setItem("num", num);
    } else {
        acceptDiv.style.display = "block";
    }
    }
    )
}
retrieveData(localStorage.getItem("loggedInUserId"));

function writeData() {
    const db = getDatabase();
    const reference = ref(db, 'users/'+ localStorage.getItem("loggedInUserId"));
    set(reference, {
        acccomplishments: localStorage.getItem("accs"), 
        placeholders: localStorage.getItem("placeholders"),
        urls: localStorage.getItem("urls"),
        validated: localStorage.getItem("validated"),
        num: localStorage.getItem("num")
    }).then(() => {
      console.log("Data written successfully.");
    }).catch((error) => {
      alert("Error writing data:", error);
    });
}
onAuthStateChanged(auth, (user) => {
    if (user) {
        let name1=user.displayName
        userName.innerHTML = name1;
        localStorage.setItem("email", user.email);
        localStorage.setItem("name", name1);
    } else {   
        alert("Signing Out")
    }
});
accept.addEventListener("click", ()=>{
    localStorage.setItem("validated", "yes");
    acceptDiv.style.display = "none";
    writeData();
})
noAccept.addEventListener("click", ()=>{
    localStorage.setItem("validated", "no");
    window.location.href="index.html";
    writeData();
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('num');
    localStorage.removeItem('accs');
    localStorage.removeItem('urls');
    localStorage.removeItem('placeholders');
    localStorage.removeItem("validated");
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=> {
        console.log('error signing out');
    })
})
logoutButton.addEventListener('click', ()=>{
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('num');
    localStorage.removeItem('accs');
    localStorage.removeItem('urls');
    localStorage.removeItem('placeholders');
    localStorage.removeItem("validated");
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=> {
        console.log('error signing out');
    })
});