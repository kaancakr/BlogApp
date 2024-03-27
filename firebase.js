// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbvV4t9cVRK_PsRZr0Z316eUtnks8Deu8",
    authDomain: "abu-app-b4282.firebaseapp.com",
    projectId: "abu-app-b4282",
    storageBucket: "abu-app-b4282.appspot.com",
    messagingSenderId: "111029705204",
    appId: "1:111029705204:web:0ec32d08b715d5c4ee81a1"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };