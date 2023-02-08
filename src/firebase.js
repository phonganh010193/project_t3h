// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjaoSpyd3ylqHlyvE6zVUQGw4qKR40Zo8",
  authDomain: "phong-t3h.firebaseapp.com",
  projectId: "phong-t3h",
  storageBucket: "phong-t3h.appspot.com",
  messagingSenderId: "533276836858",
  appId: "1:533276836858:web:bf7531caf07fae41ca1a43",
  measurementId: "G-53XVVGR246"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase();

