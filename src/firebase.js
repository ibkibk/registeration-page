// var firebaseConfig = {
//   apiKey: "AIzaSyB6eiCva1iYpIiVNH4RxK3gA5U6Wyic4uM",
//   authDomain: "login-page-79bc9.firebaseapp.com",
//   databaseURL: "https://login-page-79bc9.firebaseio.com",
//   projectId: "login-page-79bc9",
//   storageBucket: "login-page-79bc9.appspot.com",
//   messagingSenderId: "492613855232",
//   appId: "1:492613855232:web:ea110e4b85541e25f9d0e5",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB6eiCva1iYpIiVNH4RxK3gA5U6Wyic4uM",
  authDomain: "login-page-79bc9.firebaseapp.com",
  databaseURL: "https://login-page-79bc9.firebaseio.com",
  projectId: "login-page-79bc9",
  storageBucket: "login-page-79bc9.appspot.com",
  messagingSenderId: "492613855232",
  appId: "1:492613855232:web:ea110e4b85541e25f9d0e5",
});

// firebase.initializeApp(firebaseConfig);

export const providers = {
  google: new firebase.auth.GoogleAuthProvider(),
};
export const db = firebaseApp.firestore();
export const firestore = firebase.firestore();

export default firebase;
