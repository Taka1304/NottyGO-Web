import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFireStore } from "firebase/firestore"
import { getDatabase }from "firebase/database"
import { firebaseConfig } from "./firebaseConfig"



// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFireStore()
export const rtdb = getDatabase()