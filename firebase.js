// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDB__f_glEVwMZioLPb5cIsrs3Pv2lFxdM",
    authDomain: "devapp-c9602.firebaseapp.com",
    projectId: "devapp-c9602",
    storageBucket: "devapp-c9602.appspot.com",
    messagingSenderId: "1078155283496",
    appId: "1:1078155283496:web:58bdf2ef68e9970da2b91d"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };

//ios: 1078155283496-pd993oggleujre5ba8bresif9udd9u1q.apps.googleusercontent.com