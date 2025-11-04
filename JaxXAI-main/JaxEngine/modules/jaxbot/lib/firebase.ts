import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getAnalytics, type Analytics } from "firebase/analytics"
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase (singleton pattern)
let app: FirebaseApp
let auth: Auth
let db: Firestore
let analytics: Analytics | null = null
let geminiModel: any = null

if (typeof window !== "undefined") {
  // Client-side initialization
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }

  auth = getAuth(app)
  db = getFirestore(app)

  // Analytics only works in browser
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) {
    analytics = getAnalytics(app)
  }

  try {
    const ai = getAI(app, { backend: new GoogleAIBackend() })
    geminiModel = getGenerativeModel(ai, { model: "gemini-2.0-flash-exp" })
  } catch (error) {
    console.error("Failed to initialize Gemini AI:", error)
  }
}

export { app, auth, db, analytics, geminiModel }
export const APP_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "jaxengine"
