// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArnoDfe_Y7PJlMVwNIbvfcZTUBM22VYL0",
  authDomain: "learn-hub-fbf2c.firebaseapp.com",
  projectId: "learn-hub-fbf2c",
  storageBucket: "learn-hub-fbf2c.appspot.com",
  messagingSenderId: "887554848402",
  appId: "1:887554848402:web:4c7b5a66eea2798d46584b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
