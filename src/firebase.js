// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7taBVCiiS_z_MQm-a5foZD1LXyA5fnw8",
  authDomain: "tour-and-travels-8daa3.firebaseapp.com",
  projectId: "tour-and-travels-8daa3",
  storageBucket: "tour-and-travels-8daa3.firebasestorage.app",
  messagingSenderId: "663718793231",
  appId: "1:663718793231:web:3a3caf6d6a3e237485d37a",
  measurementId: "G-DSWSSJ14T6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const googleProvider= new GoogleAuthProvider()
export default app