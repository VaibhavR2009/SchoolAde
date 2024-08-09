import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
        import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    window.location.href="app.html";
});
    function writeData(list) {
      const db = getDatabase();
      const reference = ref(db, 'users/'+ localStorage.getItem("loggedInUserId"));
      let accs = list.toString();
      for (let i = 0; i < accs.length; i++) {
        accs=accs.replace(",", "𖤓");
      }
      localStorage.setItem("accs", accs);
      set(reference, {
        acccomplishments: accs,
        placeholders: localStorage.getItem("placeholders"),
        urls: localStorage.getItem("urls"),
        validated: localStorage.getItem("validated"),
        num:localStorage.getItem("num")
    }).then(() => {
      console.log("Data written successfully.");
    }).catch((error) => {
      alert("Error writing data:", error);
    });
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let list = [];
const both = document.getElementById("deleteAndEdit");
const db = getDatabase()
const uid = localStorage.getItem('loggedInUserId');
let editAcc = document.getElementById("editAcc");
let done1 = document.getElementById("done1");
let cancel1 = document.getElementById("cancel1");
let textBox = document.getElementById("textBox");
editAcc.style.display="none";
textBox.contentEditable= true;
let textBox1 = document.getElementById("textBox1");
textBox1.contentEditable= true;
textBox1.style.fontSize="15px";
function retrieveData() {
  const acccomplishmentsRef = ref(db);
  get(child(acccomplishmentsRef, 'users/' + uid)).then ((snapshot)=>{
    if (snapshot.exists()) {
      console.log("Retrieving Data");
      console.log(snapshot.val().acccomplishments);
      const accs = snapshot.val().acccomplishments;
      let list2 = accs.split("𖤓");
      list = list.concat(list2);
      localStorage.setItem("accs", accs);
      if (list[0]==="") {
        list.splice(0);
      }
      let num = list.length;
      localStorage.setItem("num", num);
      
      if (list.length>0) {
        for (let i = 0; i < list.length; i++) {
          var paragraph = document.createElement('div');
          paragraph.style.height = "200px";
          paragraph.style.width = "200px";
          paragraph.style.border= "5px solid rgb(28, 27, 27)";
          paragraph.style.color="rgb(255, 255, 255)";
          paragraph.style.backgroundColor = "rgb(57, 57, 57)";
          paragraph.style.padding = "10px";
          paragraph.style.float = "left";
          paragraph.style.marginTop = "10px";
          paragraph.style.scrollbarWidth="thin";
          paragraph.style.scrollbarColor="rgb(28, 27, 27) rgb(57, 57, 57)";
          var text = document.createElement("p");
          paragraph.appendChild(text);
          text.innerText = list[i];
          text.style.width="200px";
          text.style.border="none";
          text.style.overflowWrap="break-word";
          text.style.overflowY="none";
          paragraph.style.overflowX="scroll";
          both.style.display="block";
          let both1 = both.cloneNode(true);
          both.style.display="none";
          container.appendChild(paragraph).appendChild(both1);
        }
      }
    }
  }).catch ((error)=>{
    console.log("Unable to retrieve data: " + error);
  })

}
retrieveData();


const back = document.getElementById("back");
back.addEventListener("click", ()=>{
  window.location.href="app.html";
})

both.style.display = "none";
var textInput = document.getElementById("textInput"); 
textInput.style.display = "none";
const add = document.getElementById("add");
add.addEventListener("click", ()=>{
  if(editAcc.style.display!=="block") {
    textInput.style.display = "block";
  } else {
    alert("Finish editing your accomplishment!")
  }
})
let done = document.getElementById("done");
let container = document.getElementById("accs");
done.addEventListener("click", ()=>{
  textInput.style.display = "none";
  if (textBox.innerText !== "") {
    var paragraph = document.createElement('div');
    paragraph.style.height = "200px";
    paragraph.style.width = "200px";
    paragraph.style.border= "5px solid rgb(28, 27, 27)";
    paragraph.style.color="rgb(255, 255, 255)";
    paragraph.style.backgroundColor = "rgb(57, 57, 57)";
    paragraph.style.padding = "10px";
    paragraph.style.float = "left";
    paragraph.style.marginTop = "10px";
    paragraph.style.scrollbarWidth="thin";
    paragraph.style.scrollbarColor="rgb(28, 27, 27) rgb(57, 57, 57)";
    var text = document.createElement("p");
    paragraph.appendChild(text);
    text.innerText = textBox.innerText;
    text.style.width="200px";
    text.style.overflowWrap="break-word";
    text.style.overflowY="none";
    paragraph.style.overflowX="scroll";
    both.style.display="block";
    let both1 = both.cloneNode(true);
    both.style.display="none";
    container.appendChild(paragraph).appendChild(both1);
    textBox.innerText = "";
    list.push(text.innerText);
    console.log(list);
    let num = list.length;
    localStorage.setItem("num", num);
      writeData(list);
    }
  }

);
let cancel = document.getElementById("cancel")
cancel.addEventListener("click", ()=>{
  textInput.style.display = "none";
  textBox.innerText='';
}); 
container.addEventListener("click", function(e) {
  if (e.target.tagName==="IMG") {
    e.target.parentNode.parentNode.parentNode.remove();
    let remov = e.target.parentNode.parentNode.parentNode.innerText;
    let index = list.indexOf(remov);
    list.splice(index, 1);
    let num = list.length;
    localStorage.setItem("num", num);
    writeData(list);
    console.log(list);
  }
});
let lastClickedParagraph;
let container1;
let remove;
container.addEventListener("click", function(e) {
  lastClickedParagraph = e.target.innerText;
  remove = e.target.parentNode;
  if (e.target.tagName==="P") {
    container1 = e.target;
    if (textInput.style.display!=="block") {
      console.log(lastClickedParagraph);56
      editAcc.style.display="block";
      textBox1.innerText=lastClickedParagraph;
    } else {
      alert("Finish your new accomplishment first!")
    }
  }
});
cancel1.addEventListener("click", ()=>{
  editAcc.style.display="none";
})
done1.addEventListener("click", ()=>{
  if (textBox1.innerText!=="") {
    let editedMessage = document.getElementById("textBox1");
    editedMessage=editedMessage.innerText;
    console.log(textBox1.innerText);
    container1.innerText = editedMessage;
    console.log("Edited message: " + editedMessage);
    console.log("Old message: " + lastClickedParagraph);
    let index = list.indexOf(lastClickedParagraph);
    list[index] = editedMessage;
    console.log(list);
    writeData(list);
    textBox1.innerText="";
    editAcc.style.display="none";
  }else {
    textBox1.innerText="";
    editAcc.style.display="none";
    let index = list.indexOf(lastClickedParagraph);
    list.splice(index, 1);
    let num = list.length;
    localStorage.setItem("num", num);
    writeData(list);
    console.log(list);
    remove.remove();
  }
  
})
