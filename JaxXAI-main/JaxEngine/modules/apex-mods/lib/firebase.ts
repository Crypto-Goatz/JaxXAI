// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAnalytics, type Analytics } from "firebase/analytics"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5iiz_H0loxxmx44720UX-ZTc44RAVK9A",
  authDomain: "apex-ai-v2.firebaseapp.com",
  databaseURL: "https://apex-ai-v2-default-rtdb.firebaseio.com",
  projectId: "apex-ai-v2",
  storageBucket: "apex-ai-v2.firebasestorage.app",
  messagingSenderId: "589124333720",
  appId: "1:589124333720:web:d99236177c1f9b1a78e0ed",
  measurementId: "G-2FDNLZS7QX",
}

// Initialize Firebase (singleton pattern to prevent multiple initializations)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Initialize Firebase services
let analytics: Analytics | null = null
let auth: Auth
let db: Firestore
let storage: FirebaseStorage

// Initialize Analytics only on client side
if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}

// Initialize other Firebase services
auth = getAuth(app)
db = getFirestore(app)
storage = getStorage(app)

export { app, analytics, auth, db, storage }
