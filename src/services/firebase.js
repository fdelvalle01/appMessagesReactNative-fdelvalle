// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA7v7JeFgTWbnXUnnZHYz3ETQAGsmi8nE",
  authDomain: "messageproject-2f65e.firebaseapp.com",
  projectId: "messageproject-2f65e",
  storageBucket: "messageproject-2f65e.appspot.com",
  messagingSenderId: "37129590004",
  appId: "1:37129590004:web:16f2f700f79914a2163aa1",
  measurementId: "G-NKW5E008RC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firestore = getFirestore();

export const storage = getStorage();