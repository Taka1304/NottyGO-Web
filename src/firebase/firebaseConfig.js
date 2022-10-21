export const userFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_USER_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_USER_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_USER_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_USER_FIREBASE_STORANGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_USER_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_USER_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_USER_FIREBASE_MEASUREMENT_ID
}

export const busFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORANGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}