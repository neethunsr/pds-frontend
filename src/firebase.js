import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyD5spuMjdjcVSphUP3oTMqiu4xmUEr3eWk",
//   authDomain: "ration-db8cf.firebaseapp.com",
//   projectId: "ration-db8cf",
//   storageBucket: "ration-db8cf.appspot.com",
//   messagingSenderId: "1077498149638",
//   appId: "1:1077498149638:web:d84f0ab7be604e9432bc87",
//   measurementId: "G-YNKDQFVS9S"
// };

// firebase.initializeApp(firebaseConfig);
// // eslint-disable-next-line

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC93gdZfaSH3bHm_4u7MD6ImjbrFpbgxSc",
  authDomain: "finalprojectpds-b9a7e.firebaseapp.com",
  projectId: "finalprojectpds-b9a7e",
  storageBucket: "finalprojectpds-b9a7e.appspot.com",
  messagingSenderId: "426892116372",
  appId: "1:426892116372:web:6ace6da8e77ba269ef4f81",
  measurementId: "G-Z8QLN3F6XG",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default firebase;
