import { FieldValue, getDoc, doc, collection } from "firebase/firestore"
import { useState } from "react"
import { userDB } from "../firebase/client"

export const useStampNumber = () => {
  const [stamp, setStamp] = useState()

  const stampNumber = async (uid) => {
    try {
      const snapshot = await getDoc(doc(collection(userDB, 'users'), uid))
      if (snapshot.exists()) {
        setStamp(snapshot.data().stamp)
      } else {
        console.log("snapshot underfind")
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return { stamp, stampNumber }
} 

export const useGetStamp = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState()

  const getStamp = async ({uid}) => {
    const userRef = doc(collection(userDB, '/users'), uid)
    try {
      await userRef.update({
        stamp: FieldValue.increment(1)
      })
      setSuccess(true)
    } catch (e) {
      setError(e)
    }
  }

  return { success, error, getStamp }
}