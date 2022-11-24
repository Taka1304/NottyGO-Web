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
const busApp = process.env.NEXT_PUBLIC_API_KEY != undefined ? initializeApp(busFirebaseConfig, 'buslocaiton'): null
// 環境変数がない場合、nullにしておく
export const busRTDB = process.env.NEXT_PUBLIC_API_KEY != undefined ? getDatabase(busApp) : null