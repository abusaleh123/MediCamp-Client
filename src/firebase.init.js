// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC-BD6-NbJYYr5cnsAjoQXbdkP2gmf2gBU",
//   authDomain: "medicamp-a1652.firebaseapp.com",
//   projectId: "medicamp-a1652",
//   storageBucket: "medicamp-a1652.firebasestorage.app",
//   messagingSenderId: "298536094908",
//   appId: "1:298536094908:web:c69e23fb64008ddefb14b9"
// };
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth