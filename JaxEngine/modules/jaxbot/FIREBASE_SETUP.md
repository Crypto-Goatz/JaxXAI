# Firebase Setup Guide

Complete setup instructions for integrating Firebase Authentication and Firestore with the Jaxbot Strategy Control Center.

## Prerequisites

- Firebase project created at [Firebase Console](https://console.firebase.google.com)
- Firebase CLI installed (optional, for local testing)

## Step 1: Configure Environment Variables

Add these environment variables to your Vercel project (via the Vars section in v0):

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAeBkVeIOlpuJT-Q6IS00Y4C86poHa7TGQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jaxengine.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=jaxengine
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=jaxengine.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=442431325644
NEXT_PUBLIC_FIREBASE_APP_ID=1:442431325644:web:631aa1a3cd2f3375f4c969
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-YG0CC084GL
\`\`\`

## Step 2: Enable Google Sign-In

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **jaxengine**
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Google** provider
5. Toggle **Enable**
6. Add your project support email
7. Click **Save**

## Step 3: Create Firestore Database

1. In Firebase Console, navigate to **Firestore Database**
2. Click **Create database**
3. Select **Start in production mode** (we'll add security rules next)
4. Choose your preferred region (e.g., `us-central1`)
5. Click **Enable**

## Step 4: Configure Firestore Security Rules

1. In Firestore Database, go to the **Rules** tab
2. Replace the default rules with the contents of `firestore.rules` file
3. Click **Publish**

### Security Rules Explanation

The rules ensure:
- ✅ Users can only read/write their own data
- ✅ Authentication is required for all operations
- ✅ Data is organized by user ID: `artifacts/jaxengine/users/{uid}/...`
- ❌ Unauthenticated access is denied
- ❌ Users cannot access other users' data

## Step 5: Verify Setup

### Test Authentication

1. Run your app locally or on Vercel
2. Click the **Sign In** button in the header
3. Sign in with your Google account
4. Verify you see your profile picture and name in the header

### Test Firestore Access

Use these curl commands to verify security rules:

\`\`\`bash
# Set your variables
PROJECT_ID="jaxengine"
USER_UID="<your-user-uid>"
ID_TOKEN="<your-firebase-id-token>"

# Test authenticated read (should succeed)
curl -X GET \
  "https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/artifacts/jaxengine/users/${USER_UID}/profile/main" \
  -H "Authorization: Bearer ${ID_TOKEN}"

# Test unauthenticated read (should fail with 403)
curl -X GET \
  "https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/artifacts/jaxengine/users/${USER_UID}/profile/main"

# Test write to own profile (should succeed)
curl -X PATCH \
  "https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/artifacts/jaxengine/users/${USER_UID}/profile/main" \
  -H "Authorization: Bearer ${ID_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "preferences": {
        "mapValue": {
          "fields": {
            "defaultCrypto": {"stringValue": "BTC"},
            "notifications": {"booleanValue": true}
          }
        }
      }
    }
  }'
\`\`\`

### Get Your ID Token

To get your Firebase ID token for testing:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Run this code after signing in:

\`\`\`javascript
import { getAuth } from 'firebase/auth';
const auth = getAuth();
auth.currentUser.getIdToken().then(token => console.log(token));
\`\`\`

## Firestore Data Structure

Your app uses this document structure:

\`\`\`
artifacts/
  └── jaxengine/
      └── users/
          └── {uid}/
              ├── profile/
              │   └── main (UserProfile document)
              ├── trading/
              │   └── ... (trading data)
              ├── watchlists/
              │   └── ... (user watchlists)
              └── strategies/
                  └── ... (user strategies)
\`\`\`

### UserProfile Document Schema

\`\`\`typescript
{
  uid: string
  email: string
  displayName: string | null
  photoURL: string | null
  createdAt: string (ISO 8601)
  lastLogin: string (ISO 8601)
  preferences?: {
    defaultCrypto?: string
    notifications?: boolean
  }
}
\`\`\`

## Troubleshooting

### "Firebase: Error (auth/unauthorized-domain)"

Add your domain to authorized domains:
1. Firebase Console → Authentication → Settings
2. Scroll to **Authorized domains**
3. Add your Vercel domain (e.g., `your-app.vercel.app`)

### "Missing or insufficient permissions"

Check that:
1. Firestore security rules are published
2. User is authenticated (check `auth.currentUser`)
3. Document path matches the security rules pattern

### "Firebase app not initialized"

Ensure all environment variables are set correctly in Vercel dashboard.

## Next Steps

- [ ] Enable email/password authentication (optional)
- [ ] Set up Firebase Storage for user uploads
- [ ] Configure Firebase Cloud Functions for backend logic
- [ ] Set up Firebase Analytics for user tracking
- [ ] Add custom claims for role-based access control

## Support

For issues with Firebase setup, check:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
