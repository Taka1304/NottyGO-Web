import { useState } from 'react'
import { userDB } from "../firebase/client";
import { doc, increment, updateDoc, collection, arrayUnion, } from "firebase/firestore";


export const useCoupon = () => {
  const [success, setSuccess] = useState()
  const [error, setError] = useState()

  const getCoupon = async (uid, num) => {
    const userRef = doc(collection(userDB, '/users'), uid)
    let dt = new Date()
    dt = dt.setFullYear(dt.getFullYear()+1)
    try {
      //データの更新
      await updateDoc(userRef, {
        stamp: increment(-7*num),
        coupon: arrayUnion(
          {
            name: "バス無料券",
            expiration_date: Timestamp.fromDate(dt)
          }
        )
      })
      setSuccess(true)
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }
  return { success, error, getCoupon}
}