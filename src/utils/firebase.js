// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBl_0ecxhgxQPgwOBrqka32wbGN3V0fyo",
  authDomain: "connectx-22806.firebaseapp.com",
  projectId: "connectx-22806",
  storageBucket: "connectx-22806.appspot.com",
  messagingSenderId: "422969615416",
  appId: "1:422969615416:web:5190e7d97794b58ca3b2cd",
  measurementId: "G-PLMSGRV7VT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);