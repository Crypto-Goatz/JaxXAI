import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db, APP_ID } from "./firebase"

export interface UserProfile {
  uid: string
  email: string
  displayName: string | null
  photoURL: string | null
  createdAt: string
  lastLogin: string
  preferences?: {
    defaultCrypto?: string
    notifications?: boolean
  }
}

// Get user profile from Firestore
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, `artifacts/${APP_ID}/users/${uid}/profile/main`)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile
    }
    return null
  } catch (error) {
    console.error("[v0] Error getting user profile:", error)
    return null
  }
}

// Create or update user profile
export async function setUserProfile(uid: string, profile: Partial<UserProfile>): Promise<void> {
  try {
    const docRef = doc(db, `artifacts/${APP_ID}/users/${uid}/profile/main`)
    await setDoc(
      docRef,
      {
        ...profile,
        uid,
        lastLogin: new Date().toISOString(),
      },
      { merge: true },
    )
  } catch (error) {
    console.error("[v0] Error setting user profile:", error)
    throw error
  }
}

// Update user preferences
export async function updateUserPreferences(uid: string, preferences: UserProfile["preferences"]): Promise<void> {
  try {
    const docRef = doc(db, `artifacts/${APP_ID}/users/${uid}/profile/main`)
    await updateDoc(docRef, { preferences })
  } catch (error) {
    console.error("[v0] Error updating preferences:", error)
    throw error
  }
}
