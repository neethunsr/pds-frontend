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
	apiKey: "AIzaSyBkAQFqP5x6xEABYG-5Q1pB0Eb4EzGKp5o",
	authDomain: "blockchain-pds-2025.firebaseapp.com",
	projectId: "blockchain-pds-2025",
	storageBucket: "blockchain-pds-2025.firebasestorage.app",
	messagingSenderId: "1041268416766",
	appId: "1:1041268416766:web:1f7bd54f5bcaaebb2985af",
	measurementId: "G-8CC185HNNB",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
	// let firestore = firebase.firestore();
}
// const analytics = getAnalytics(app);
// firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default firebase;
