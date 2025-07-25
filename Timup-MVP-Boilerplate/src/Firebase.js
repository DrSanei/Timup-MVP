// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA-ci0_NXe3xz2TOt8yj2j__vv6hdIU2d8", 
  authDomain: "timup-mvp.firebaseapp.com",
  projectId: "timup-mvp",
  storageBucket: "timup-mvp.firebasestorage.app",
  messagingSenderId: "379238760797",
  appId: "1:379238760797:web:7c96defc9d45da5c45e8b4",
  measurementId: "G-VRX9M77MJS"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
