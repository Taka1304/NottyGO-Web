import { useState } from 'react'
import { userDB } from "../firebase/client";
import { doc, increment, updateDoc, collection, arrayUnion, Timestamp } from "firebase/firestore";


export const useCoupon = () => {
  const [success, setSuccess] = useState()
  const [error, setError] = useState()

  const getCoupon = async (uid, num) => {
    const userRef = doc(collection(userDB, '/users'), uid)
    let dt = new Date()

    const y = dt.getFullYear()+1
    const m = dt.getMonth()
    const d = dt.getDay()
    
    const hh = dt.getHours()*100000
    const mm = dt.getMinutes()*1000
    const ss = dt.getSeconds()*10

    const couponArray = []
    for (let i=0; i < num; i++) {
      couponArray.push({
        id: hh+mm+ss+i,
        name: "バス無料券",
        expiration_date: Timestamp.fromDate(new Date(`${y}/${m}/${d}`))
      })
    }

    console.log(...couponArray)

    try {
      //データの更新
      await updateDoc(userRef, {
        stamp: increment(-7*num),
        coupon: arrayUnion(...couponArray)
      })
      setSuccess(true)
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }
  return { success, error, getCoupon }
}