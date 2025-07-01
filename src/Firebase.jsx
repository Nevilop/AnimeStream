// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcteTk4F7KeRlfTEOiotVhH23NaYMcOzw",
  authDomain: "animeflix-a144c.firebaseapp.com",
  projectId: "animeflix-a144c",
  storageBucket: "animeflix-a144c.firebasestorage.app",
  messagingSenderId: "578819115055",
  appId: "1:578819115055:web:31f9bfc3773acbd16d1eda",
  measurementId: "G-S3MKHG6TML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);