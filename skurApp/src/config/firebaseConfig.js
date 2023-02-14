// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8BuJV5Y258VRFxcdivzJRo1JfDH41L3A",
  authDomain: "skur-6b025.firebaseapp.com",
  projectId: "skur-6b025",
  storageBucket: "skur-6b025.appspot.com",
  messagingSenderId: "955002759085",
  appId: "1:955002759085:web:41603766ffb0d4d8e5e324"
};


// Initialize Firebase
const firebaseService = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseService)

// Add google sign in provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const firestoreService = getFirestore(firebaseService);

export default firebaseService