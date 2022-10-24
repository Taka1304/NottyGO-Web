import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getDatabase }from "firebase/database"
import { busFirebaseConfig, userFirebaseConfig } from "./firebaseConfig"

// ユーザーデータが格納されているFirebaseプロジェクトを初期化
const userApp = initializeApp(userFirebaseConfig)

export const userAuth = getAuth(userApp)
export const userDB = getFirestore(userApp)

//バスの位置情報が格納されているFirebaseプロジェクトを初期化
const busApp = initializeApp(busFirebaseConfig, 'buslocaiton')

export const busRTDB = getDatabase(busApp)