import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
 //handle your api 
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
