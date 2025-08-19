// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwexDlaGFdu4iScy5HOaspSXFkk5mSKDE",
  authDomain: "gold-web-752cd.firebaseapp.com",
  projectId: "gold-web-752cd",
  storageBucket: "gold-web-752cd.firebasestorage.app",
  messagingSenderId: "928474260458",
  appId: "1:928474260458:web:3b54c390cb039336a10893"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;