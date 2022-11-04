import { FieldValue, getDoc, doc, collection, serverTimestamp } from "firebase/firestore"
import { useState } from "react"
import { userDB } from "../firebase/client"

export const useUserData = () => {
  const [userData, setUserData] = useState({
    email: "",
    stamp: 0,
    updateAt: {
      nanoseconds: 0,
      seconds: 0
    }
  })

  const getUserData = async (uid) => {
    try {
      const snapshot = await getDoc(doc(collection(userDB, 'users'), uid))
      if (snapshot.exists()) {
        setUserData(snapshot.data())
      } else {
        console.log("snapshot underfind")
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return { userData, getUserData }
} 

export const useGetStamp = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState()

  const getStamp = async ({uid}) => {
    const userRef = doc(collection(userDB, '/users'), uid)
    try {
      //データの更新
      await userRef.update({
        stamp: FieldValue.increment(1),
        updateAt: serverTimestamp()
      })
      setSuccess(true)
    } catch (error) {
      setError(error)
    }
  }

  return { success, error, getStamp }
}