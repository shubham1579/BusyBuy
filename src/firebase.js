import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-4YZLOCyPfNBDzU4xoDc9F2FYT4BVzO8",
  authDomain: "busy-buy-acb78.firebaseapp.com",
  projectId: "busy-buy-acb78",
  storageBucket: "busy-buy-acb78.appspot.com",
  messagingSenderId: "917385352376",
  appId: "1:917385352376:web:3f4207fd46101dae56104d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app);

export { db, auth }