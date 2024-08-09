import { initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, deleteUser, GoogleAuthProvider, reauthenticateWithPopup} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {child, get} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {getDatabase, ref, set, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
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
const auth= getAuth();
const name1 = localStorage.getItem("name");
const deletes = document.getElementById("deletes");
deletes.style.display="none";
const username = document.getElementById("username");
username.innerText=name1;
const email = document.getElementById("email");
const email1 = localStorage.getItem("email");
email.innerText=email1;
const back = document.getElementById("back")
back.addEventListener("click", ()=>{
    window.location.href="app.html"
})
function writeData() {
    const db = getDatabase();
    const reference = ref(db, 'users/'+ localStorage.getItem("loggedInUserId"));
    set(reference, {
        acccomplishments: localStorage.getItem("accs"), 
        placeholders: localStorage.getItem("placeholders"),
        urls: localStorage.getItem("urls"),
        validated: localStorage.getItem("validated"),
        num : localStorage.getItem("num")
    }).then(() => {
      console.log("Data written successfully.");
      window.location.href="app.html";
    }).catch((error) => {
      alert("Error writing data:", error);
    });
    sec = 1;
}

const noAccept = document.getElementById("noAccept");
noAccept.addEventListener("click", ()=> {
    localStorage.setItem("validated", "no");
    writeData();
});

const numOfAcc = document.getElementById("numOfAcc");
const num = localStorage.getItem("num");
const text = document.getElementById("innerText");
if (num !=="undefined") {
    text.innerText= num;
} else {
    text.innerText= "0";
}
let deleteAccount = document.getElementById("textDelete");
let yes = document.getElementById("yes");
let no = document.getElementById("no");
deleteAccount.addEventListener("click", ()=>{
    deletes.style.display="block";
    yes.addEventListener("click", async () => {
        const user = auth.currentUser;
        if (user) {
            // Use Google provider for re-authentication
            const provider = new GoogleAuthProvider();
            try {
                await reauthenticateWithPopup(user, provider);
                const db = getDatabase();
                const userRef = ref(db, 'users/' + localStorage.getItem("loggedInUserId"));
                await remove(userRef);
                await deleteUser(user);
                alert("Your account has been deleted");
                localStorage.removeItem('loggedInUserId');
                localStorage.removeItem('email');
                localStorage.removeItem('name');
                localStorage.removeItem('num');
                localStorage.removeItem('accs');
                localStorage.removeItem('urls');
                localStorage.removeItem('placeholders');
                localStorage.removeItem("validated");
                window.location.href = "index.html";
            } catch (error) {
                console.error("Error re-authenticating or deleting user:", error);
                alert("Error re-authenticating or deleting user: " + error.message);
            }
        } else {
            alert("No user is currently signed in.");
        }
    });
    no.addEventListener("click", () => {
        deletes.style.display = "none";
    });
});
const numLeft = document.getElementById("numLeft");
const goals = [10, 20, 40, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000];
let goal;
const message = document.getElementById("message");
const right = document.getElementById("right");
function getNumLeft() {
    if (num !=="undefined") {
        if (Number(num) < Number(goals[0])) {
            goal = Number(goals[0]) - Number(num);
            numLeft.innerText = goal;
        }
        if (Number(num) < Number(goals[1])&& Number(num)>Number(goals[0])) {
            goal = Number(goals[1]) - Number(num);
            numLeft.innerText = goal;
        }
        if (Number(num) < Number(goals[2])&& Number(num)>Number(goals[1])) {
            goal = Number(goals[2]) - Number(num);
            numLeft.innerText = goal;
        }
        if (Number(num) < Number(goals[3])&& Number(num)>Number(goals[2])) {
            goal = Number(goals[3]) - Number(num);
            numLeft.innerText = goal;
        }
        if (Number(num) < Number(goals[4])&& Number(num)>Number(goals[3])) {
            goal = Number(goals[4]) - Number(num);
            numLeft.innerText = goal;
        }
        if (Number(num) < Number(goals[5])&& Number(num)>Number(goals[4])) {
            goal = Number(goals[5]) - Number(num);
            numLeft.innerText = goal;
        }
        if (Number(num) < Number(goals[6])&& Number(num)>Number(goals[5])) {
            goal = Number(goals[6]) - Number(num);
            numLeft.innerText = goal;
        }
        if (Number(num) < Number(goals[7])&& Number(num)>Number(goals[6])) {
            goal = Number(goals[7]) - Number(num);
            numLeft.innerText = goal;
        }
        if (Number(num) < Number(goals[8])&& Number(num)>Number(goals[7])) {
            goal = Number(goals[8]) - Number(num);
            numLeft.innerText = goal;
        }
        if (Number(num) < Number(goals[9])&& Number(num)>Number(goals[8])) {
            goal = Number(goals[9]) - Number(num);
            numLeft.innerText = goal;
        }
        if (Number(num) < Number(goals[10])&& Number(num)>Number(goals[9])) {
            goal = Number(goals[10]) - Number(num);
            numLeft.innerText = goal;
        }
        if (Number(num) < Number(goals[11])&& Number(num)>Number(goals[10])) {
            goal = Number(goals[11]) - Number(num);
            numLeft.innerText = goal;
        }
        if (Number(num) < Number(goals[12])&& Number(num)>Number(goals[11])) {
            goal = Number(goals[12]) - Number(num);
            numLeft.innerText = goal;
        }
        if (Number(num) < Number(goals[13])&& Number(num)>Number(goals[12])) {
            goal = Number(goals[13]) - Number(num);
            numLeft.innerText = goal;
        }
        if (Number(num) < Number(goals[14])&& Number(num)>Number(goals[13])) {
            goal = Number(goals[14]) - Number(num);
            numLeft.innerText = goal;
        }
        if (Number(num) < Number(goals[15])&& Number(num)>Number(goals[14])) {
            goal = Number(goals[15]) - Number(num);
            numLeft.innerText = goal;
        }
} else {
    numLeft.innerText = "10";
}
}
function check() {
    if (Number(num) === Number(goals[0])) {
        message.innerText = "The first goal has been completed! Lets see if you can get the next one!";
        numLeft.innerText="0";
    };
    if (Number(num) === Number(goals[1])) {
        message.innerText = "Your on a roll. The second one has been completed!";
        numLeft.innerText="0";
    };
    if (Number(num) === Number(goals[2])) {
        message.innerText = "How are you this good? Third goal completed!";
        numLeft.innerText="0";
    };
    if (Number(num) === Number(goals[3])) {
        message.innerText = "I can't believe it, you have completed your fourth goal!";
        numLeft.innerText="0";
    };
    if (Number(num) === Number(goals[4])) {
        message.innerText = "You're just too good! You have reached the 100 milestone!";
        numLeft.innerText="0";
    };
    if (Number(num) === Number(goals[5])) {
        message.innerText = "I am speechless! 150 accomplishments!";
        numLeft.innerText="0";
    };
    if (Number(num) === Number(goals[6])) {
        message.innerText = "That's amazing! 200 accomplishments!";
        numLeft.innerText="0";
    };
    if (Number(num) === Number(goals[7])) {
        message.innerText = "This is not possible! 250 accomplishments!";
        numLeft.innerText="0";
    };
    if (Number(num) === Number(goals[8])) {
        message.innerText = "This number! It's to great to be true!";
        numLeft.innerText="0";
    };
    if (Number(num) === Number(goals[9])) {
        message.innerText = "You're good! Keep climbing!";
        numLeft.innerText="0";
    };
    if (Number(num) === Number(goals[10])) {
        message.innerText = "So...Many...Accomplishments";
        numLeft.innerText="0";
    };
    if (Number(num) === Number(goals[11])) {
        message.innerText = "You ROCK! Keep getting more!";
        numLeft.innerText="0";
    };
    if (Number(num) === Number(goals[12])) {
        message.innerText = "I always knew this day would come! 700 accomplishments!";
        numLeft.innerText="0";
    };
    if (Number(num) === Number(goals[12])) {
        message.innerText = "LET HIM COOK!";
        numLeft.innerText="0";
    };
    if (Number(num) === Number(goals[12])) {
        message.innerText = "Teach me how you do this!";
        numLeft.innerText="0";
    };
    if (Number(num) === Number(goals[15])) {
        message.innerText = "I can't believe it! You have reached 1000 accomplishments! Congrats! Continue your efforts! We don't have any more goals for you! Its up to you now to make your own goals!";
        right.innerText = "";
        numLeft.innerText="";
    };
};
getNumLeft();
check();