// Import required Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore DB
const db = getFirestore(app);

export { db };
