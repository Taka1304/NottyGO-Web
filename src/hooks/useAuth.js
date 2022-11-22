import { useState } from "react"
import { useRouter } from "next/router"
import { userAuth, userDB } from "../firebase/client"
import { doc, getDoc, serverTimestamp, collection, setDoc, Timestamp } from "firebase/firestore"
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth"

//ユーザー登録
export const useSignup = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const signup = (email, password) => {
    createUserWithEmailAndPassword(userAuth, email, password)
      .then(async res => {
        setSuccess(true)

        // email: string
        // stamp: number
        // updateAt: TimeStamp(初期値は0)
        //FireStoreにユーザーデータを追加
        
        await setDoc(doc(collection(userDB, 'users'), res.user.uid),{
          email: res.user.email,
          stamp: 0,
          updateAt: Timestamp.fromDate(new Date(null)),
          coupon : [{
            name: "test"
          }]
        })
      })
      .catch(err => {
        console.log(err.message)
        setError(err.message)
      })
  }

  return { success, error, signup }
}

//ログイン
export const useLogin = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const router = useRouter()

  const login = (email, password) => {
    signInWithEmailAndPassword(userAuth, email, password)
      .then(async() => {
        setSuccess(true)
        setTimeout(() => {
          void router.push("/")
        }, 1000);
      })
      .catch(err => {
        console.log(err.message)
        setError(err.message)
      })
  }

  return { success, error, login }
}

//ログアウト
export const useLogout = () => {
  const [success, setSuccess] =useState(false)
  const [error, setError] = useState(null)

  const logout = () => {
    signOut(userAuth)
      .then(() => {
        setSuccess(true)
      })
      .catch(err => {
        setSuccess(false)
        setError(err.message)
      })
  }

  return { success, error, logout }
}

//パスワードリセット
export const usePasswordReset = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  
  const router = useRouter()
  
  const passwordReset = (email) => {
    sendPasswordResetEmail(userAuth, email)
      .then(() => {
        setSuccess(true)
        setTimeout(() => {
          void router.push("/login")
        }, 2000)
      })
      .catch(err => {
        console.log(err.message)
        setError(err.message)
      })
  }

  return { success, error, passwordReset }
}