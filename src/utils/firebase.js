// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdPmWfSQUTIdp_y0OtIFg-T1leTTOhrW4",
  authDomain: "aman-poc-netflixgpt.firebaseapp.com",
  projectId: "aman-poc-netflixgpt",
  storageBucket: "aman-poc-netflixgpt.appspot.com",
  messagingSenderId: "874850651386",
  appId: "1:874850651386:web:8d6aae41b22b96ded44d43",
  measurementId: "G-4Z32FXRSGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();