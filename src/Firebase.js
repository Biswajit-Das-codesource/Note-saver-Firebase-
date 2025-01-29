import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHX14apuTAsn8EruJ9Fz3NUalaThG22vk",
  authDomain: "notepad-3a8c4.firebaseapp.com",
  projectId: "notepad-3a8c4",
  storageBucket: "notepad-3a8c4.firebasestorage.app",
  messagingSenderId: "365629989145",
  appId: "1:365629989145:web:8690854874cb2b52186588",
  measurementId: "G-8NXNN1QF54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log(firebaseConfig)
const analytics = getAnalytics(app);

export const auth = getAuth(app);
console.log(auth ,"auth")
export const db = getFirestore(app)

export const provider  = new GoogleAuthProvider();

console.log(provider)