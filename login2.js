        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
        import { getAuth, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
    import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
                    // TODO: Add SDKs for Firebase products that you want to use
                    // https://firebase.google.com/docs/web/setup#available-libraries
                  
                    // Your web app's Firebase configuration
                    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
            const auth = getAuth(app);
            auth.languageCode='en';
            const provider = new GoogleAuthProvider();

            const googlelogin = document.getElementById('google-button');
            googlelogin.addEventListener("click", ()=> {
                signInWithPopup(auth, provider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const user = result.user;
                    localStorage.setItem('loggedInUserId', user.uid);
                    window.location.href='app.html';
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage)
                });
            })