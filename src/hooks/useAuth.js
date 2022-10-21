import { useState } from "react"
import { useRouter } from "next/router"
import { userAuth, userDB } from "../firebase/client"
import { FieldValue } from "firebase/firestore"
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
        //console.log(res.user)
        setSuccess(true)

        // email: string
        // stamp: number
        // updateAt: TimeStamp
        const data = {
          email: res.user.email,
          stamp: 0,
          updateAt: FieldValue.serverTimeStamp()
        }
        //FireStoreにユーザーデータを追加
        await userDB.collection('users').doc(`${res.user.uid}`).set(data)
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
      .then(() => {
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
  const logout = () => {
    signOut(userAuth)
      .then(() => {
        console.log("ログアウト成功")
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  return { logout }
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