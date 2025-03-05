
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

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
const db = getFirestore(app); 
const auth = getAuth(app); 

export { db, collection, addDoc, getDocs, updateDoc, doc, auth }; 