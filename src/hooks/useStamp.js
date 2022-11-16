import { useState } from "react"
import { FieldValue, getDoc, doc, collection, serverTimestamp } from "firebase/firestore"
import { userDB } from "../firebase/client"

// ユーザーのスタンプデータを取得するための関数
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

// スタンプを取得した場合のFirestore上の処理
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