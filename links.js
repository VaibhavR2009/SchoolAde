import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { child, get, getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const db = getDatabase();
const uid = localStorage.getItem('loggedInUserId');

const auth = getAuth(app);
let urlList = [];
let placeholderList = [];
let container = document.getElementById("underneath");

function retrieveData() {
    const linksref = ref(db);
    get(child(linksref, 'users/' + uid)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log("Retrieving Data");
            console.log(snapshot.val().placeholders);
            console.log(snapshot.val().urls);
            const placeholders = snapshot.val().placeholders;
            const urls = snapshot.val().urls;
            if (placeholders!=="undefined" && urls!=="undefined") {
                let list1 = urls ? urls.split("𖤓") : [];
                let list2 = placeholders ? placeholders.split("𖤓") : [];
                localStorage.setItem("placeholders", placeholders);
                localStorage.setItem("urls", urls);
                if (list1[0] === "") {
                    list1.splice(0);
                }
                if (list2[0] === "") {
                    list2.splice(0);
                }
                urlList = list1;
                placeholderList = list2;
                let num = list1.length;
                if (num > 0) {
                    for (let i = 0; i < num; i++) {
                        var paragraph = document.createElement('div');
                        paragraph.innerHTML = `<a href="${list1[i]}" target="_blank">${list2[i]}</a>
                                            <div class="buttons">
                                                <button class="delete">Delete</button>
                                            </div>`;
                        let list = paragraph.classList;
                        list.add("linkTheir");
                        container.appendChild(paragraph);
                    }
                }
            }
        }
    }).catch((error) => {
        console.log("Unable to retrieve data: " + error);
    });
}
retrieveData();

function writeData(urlList, placeholderList) {
    const db = getDatabase();
    const reference = ref(db, 'users/' + localStorage.getItem("loggedInUserId"));
    const urlString = urlList.join("𖤓");
    const placeholderString = placeholderList.join("𖤓");
    localStorage.setItem("urls", urlString);
    localStorage.setItem("placeholders", placeholderString);
    set(reference, {
        urls: urlString,
        placeholders: placeholderString,
        acccomplishments: localStorage.getItem("accs"),
        validated: localStorage.getItem("validated"),
        num:localStorage.getItem("num")
    }).then(() => {
        console.log("Data written successfully.");
    }).catch((error) => {
        console.log("Error writing data:", error);
    });
}

const back = document.getElementById("back");
back.addEventListener("click", () => {
    window.location.href = "app.html";
});

const ownBookmark = document.getElementById("ownBookmark");
let bookmark;
let link = document.getElementById("urlInput");
let placeHolder = document.getElementById("placeholderInput");

ownBookmark.addEventListener("click", () => {
    if (link.value.includes("https://")) {
        bookmark = document.createElement("div");
        const list = bookmark.classList;
        list.add("linkTheir");
        bookmark.innerHTML = `<a href="${link.value}" target="_blank">${placeHolder.value}</a>
                              <div class="buttons">
                                  <button class="delete">Delete</button>
                              </div>`;
        container.appendChild(bookmark);
        placeholderList.push(placeHolder.value);
        urlList.push(link.value);
        console.log(urlList)
        writeData(urlList, placeholderList);
        placeHolder.value = "";
        link.value = "";
    } else {
        alert("Invalid Link. Enter one with https://");
    }
});

container.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
        const parent = e.target.parentNode.parentNode;
        const anchor = parent.querySelector('a');
        const placeholder = anchor.textContent;
        const anchorTag = parent.querySelector('a');
        console.log(placeholder);
        let url = anchorTag.href;
        String(url);
        
        parent.remove();
        url = url.substring(0, url.length -1);
        console.log(url);
        const indexOfUrl = urlList.indexOf(url);
        const placeholderIndex = placeholderList.indexOf(placeholder);
        if (placeholderIndex > -1) {
            placeholderList.splice(placeholderIndex, 1);
            urlList.splice(indexOfUrl, 1);
        }
        localStorage.setItem("urls", urlList.join("𖤓"));
        localStorage.setItem("placeholders", placeholderList.join("𖤓"));
        writeData(urlList, placeholderList);
        console.log(urlList);
        console.log(placeholderList);
    }
});
