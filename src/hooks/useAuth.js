import { useState } from "react"
import { useRouter } from "next/router"
import { auth } from "../firebase/client"
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"

//ユーザー登録
export const useSignup = () => {
  const [error, setError] = useState(null)

  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        console.log(res.user)
      })
      .catch(err => {
        console.log(err.message)
        setError(err.message)
      })
  }

  return { error, signup }
}

//ログイン
export const useLogin = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const router = useRouter()

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccess(true)
        setTimeout(() => {
          router.push("/")
        }, 2000);
      })
      .catch(err => {
        console.log(err.message)
        setError(err.message)
      })
  }

  return { success, error, login }
}

export const useLogout = () => {
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.")
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  return { logout }
}