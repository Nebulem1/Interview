// Import the functions you need from the SDKs you need
import { initializeApp, getApp , getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYu0bpEYFaaq95w3W4Jnos4Owhf88nFJE",
  authDomain: "fir-7426e.firebaseapp.com",
  projectId: "fir-7426e",
  storageBucket: "fir-7426e.firebasestorage.app",
  messagingSenderId: "1092438537931",
  appId: "1:1092438537931:web:aeaa03bdbcbffe066e8d4e",
  measurementId: "G-WX6LLW2SHM"
};

// Initialize Firebase
const app = !getApps.length? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
