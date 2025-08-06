// import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCv0QURjsDdv1AdXNCfGBtwAMvsnuMp7Pk",
  authDomain: "pds-using-blockchain.firebaseapp.com",
  projectId: "pds-using-blockchain",
  storageBucket: "pds-using-blockchain.firebasestorage.app",
  messagingSenderId: "1046807604765",
  appId: "1:1046807604765:web:7f8a20e09f71c86177e0f4",
  measurementId: "G-6T4TV2SK0L",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export let db = firebase.firestore();

// const analytics = getAnalytics(app);
// firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default firebase;
