// Import required Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz2I0Ul4-0FaLgdp3JSuMd_zbvDK_ncQU",
  authDomain: "donna-4ae12.firebaseapp.com",
  projectId: "donna-4ae12",
  storageBucket: "donna-4ae12.firebasestorage.app",
  messagingSenderId: "1088686949232",
  appId: "1:1088686949232:web:790f82200cd9b896b345b5",
  measurementId: "G-0Z5N9WWDXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore DB
const db = getFirestore(app);

export { db };
