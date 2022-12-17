import { useEffect, useState } from 'react'
import { userDB } from "../firebase/client";
import { doc, increment, updateDoc, collection, arrayUnion, Timestamp,arrayRemove } from "firebase/firestore";


export const useCouponData = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState()

  const resetState = () => {
    setSuccess(false)
    setError(null)
  }
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
  const useCoupon = async(uid, coupon) => {
    setSuccess(false)
    setError(null)
    const userRef = doc(collection(userDB, '/users'), uid)
    try {
      //データの更新
      await updateDoc(userRef, {
        coupon: arrayRemove(coupon)
      })
      setSuccess(true)
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }
  return { success, error, getCoupon, useCoupon, resetState }
}