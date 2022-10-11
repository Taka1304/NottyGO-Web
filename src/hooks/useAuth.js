import { useState } from "react"
import { auth } from "../firebase/client"
import { createUserWithEmailAndPassword } from "firebase/auth"

//ユーザー登録
export const useSignup = () => {
  const [error, setError] = useState(null)

  const signup = (email, password) => {
    setError(null)
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

  const login = (email, password) => {
    setError(null)
    signInWithEmailAndPassword(fireauth, email, password)
      .then(() => {
        setSuccess(true)
      })
      .catch(err => {
        console.log(err.message)
        setError(err.message)
      })
  }

  return { success, error, login }
}