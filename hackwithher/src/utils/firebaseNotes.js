import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC1cMZu7E9fySxIeDVfWSUzMFTc4P6L32E",
    authDomain: "women-45b54.firebaseapp.com",
    projectId: "women-45b54",
    storageBucket: "women-45b54.firebasestorage.app",
    messagingSenderId: "764103586895",
    appId: "1:764103586895:web:d233988733bce23f38263a",
    measurementId: "G-PNV8M7QNKZ",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, addDoc, getDocs, updateDoc, doc, signInWithPopup, GoogleAuthProvider, onAuthStateChanged };