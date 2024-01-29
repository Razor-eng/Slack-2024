import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAj3R4p5GY6PptYpgEFnnuAH8owngU4Xg0",
    authDomain: "slack-7e501.firebaseapp.com",
    projectId: "slack-7e501",
    storageBucket: "slack-7e501.appspot.com",
    messagingSenderId: "573314464563",
    appId: "1:573314464563:web:ce4f206336aa95e2de9c46",
    measurementId: "G-X5V2Q8665J"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
