// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "coursegenie-ai.firebaseapp.com",
  projectId: "coursegenie-ai",
  storageBucket: "coursegenie-ai.appspot.com",
  messagingSenderId: "567966324515",
  appId: "1:567966324515:web:b77ca86fbf03fa7db25e96",
  measurementId: "G-TB8N2VB739"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 