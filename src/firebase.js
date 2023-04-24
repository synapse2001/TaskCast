// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvlPL2roLeLOAYSqpWEzBm0RUnOzBMVe4",
  authDomain: "taskter-8e065.firebaseapp.com",
  projectId: "taskter-8e065",
  storageBucket: "taskter-8e065.appspot.com",
  messagingSenderId: "1008578199977",
  appId: "1:1008578199977:web:6934969d6eaed1df7ac4b8",
  measurementId: "G-LTPSM2GMZ4",
  databaseURL : "https://taskter-8e065-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
