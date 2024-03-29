// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDA7v7JeFgTWbnXUnnZHYz3ETQAGsmi8nE",
//   authDomain: "messageproject-2f65e.firebaseapp.com",
//   projectId: "messageproject-2f65e",
//   storageBucket: "messageproject-2f65e.appspot.com",
//   messagingSenderId: "37129590004",
//   appId: "1:37129590004:web:16f2f700f79914a2163aa1",
//   measurementId: "G-NKW5E008RC"
// };
const firebaseConfig = {

  apiKey: "AIzaSyBXjBNj011v3a4_s2yERF5hLQJBN0zHlQ8",

  authDomain: "messageprojecttest.firebaseapp.com",

  projectId: "messageprojecttest",

  storageBucket: "messageprojecttest.appspot.com",

  messagingSenderId: "100700525890",

  appId: "1:100700525890:web:59fcf65c7789c63323a4db",

  measurementId: "G-NPV0BLX006"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firestore = getFirestore();

export const storage = getStorage();

export const database = getDatabase();

export const storageRef = getStorage(app); 