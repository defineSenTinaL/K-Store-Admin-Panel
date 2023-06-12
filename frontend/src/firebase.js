
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoapwqrMEhFyDDNIeEtpbEpRArKzZZ7wc",
  authDomain: "quincy-de7d5.firebaseapp.com",
  projectId: "quincy-de7d5",
  storageBucket: "quincy-de7d5.appspot.com",
  messagingSenderId: "716445503561",
  appId: "1:716445503561:web:c0b7215924db7e30b2ef98"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 