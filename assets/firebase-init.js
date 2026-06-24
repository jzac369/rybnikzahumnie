// Spoločná Firebase inicializácia pre celý web RZ Záhumnie
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc,
  collection, getDocs, query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYpyZ7XO2r1OHnWjaLrtId7r_POjkSukQ",
  authDomain: "rybnikzahumnie.firebaseapp.com",
  projectId: "rybnikzahumnie",
  storageBucket: "rybnikzahumnie.firebasestorage.app",
  messagingSenderId: "46899824108",
  appId: "1:46899824108:web:c6f59e6433f4a425e46cc9",
  measurementId: "G-V88MM7221W"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export {
  doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc,
  collection, getDocs, query, orderBy, serverTimestamp,
  signInWithEmailAndPassword, onAuthStateChanged, signOut
};
