import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAt9yM_6WpBBqFqTE1UCnX6areh5XulWo",
  authDomain: "souloxy-fc09f.firebaseapp.com",
  projectId: "souloxy-fc09f",
  storageBucket: "souloxy-fc09f.firebasestorage.app",
  messagingSenderId: "970666031940",
  appId: "1:970666031940:web:a74b18033496d7b73ef511",
  measurementId: "G-YJ0F7HNSEZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
