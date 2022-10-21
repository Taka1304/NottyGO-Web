import { async } from "@firebase/util"
import { useState } from "react"
import { userDB } from "../firebase/client"

export const useStampNumber = () => {
  const [error, setError] = useState(null)
  const [stamp, setStamp] = useState(0)

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
  const [stamp, setStamp] = useState()
  const getStamp = async ({uid}) => {
    const doc = await userDB.collection('users').doc(`${uid}`).get()
    if (doc.exists) {
      console.log(doc)
    }
  
  }

  return 
}