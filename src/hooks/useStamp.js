import { async } from "@firebase/util"
import { FieldValue } from "firebase/firestore"
import { useState } from "react"
import { userDB } from "../firebase/client"

export const useStampNumber = () => {
  const [error, setError] = useState(null)
  const [stamp, setStamp] = useState()

  const stampNumber = async ({uid}) => {
    const doc = await userDB.collection('users').doc(`${uid}`).get()
    if (!doc.exists) {
      setError("error")
    } else {
      setStamp(doc.data().stamp)
    }
  }

  return {stamp, error, stampNumber}
} 

export const useGetStamp = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState()

  const getStamp = async ({uid}) => {
    const ref = userDB.collection('users').doc(`${uid}`)
    try {
      await ref.update({
        stamp: FieldValue.increment(1)
      })
      setSuccess(true)
    } catch (e) {
      setError(e)
    }
  }

  return { success, error, getStamp }
}