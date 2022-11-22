import { useState } from "react"
import { FieldValue, getDoc, doc, collection, serverTimestamp } from "firebase/firestore"
import { userDB, busRTDB } from "../firebase/client"

// ユーザーのスタンプデータを取得するための関数
export const useUserData = () => {
  const [userData, setUserData] = useState({
    email: "",
    stamp: 0,
    updateAt: {
      nanoseconds: 0,
      seconds: 0
    },
    coupon: []
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

// ユーザーの位置情報を取得して結果を返す
export const useUserPosition = () => {
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0
  })
  const [er, setError] = useState(null)
  const [su, setSuccess] = useState(false)

  const options = {
    maximumAge: 0,  // キャッシュを利用不可
    timeout: 4900, // 4900ミリ秒(4.9秒)まで許可
    enableHighAccuracy: true  // 高精度を求める(低精度でいい場合はfalse)
  }
  const success = (pos) => {
    console.log(pos.coords)
    setPosition({lat: pos.coords.latitude, lng: pos.coords.longitude})
  }
  const error = (e) => setError(e.message)

  const getPosition = () => {
    console.log("Search Current Position")
    const watchId = navigator.geolocation.watchPosition(success, error, options)
    setTimeout(() => {
      navigator.geolocation.clearWatch(watchId)
      setSuccess(true)
    }, 5000)
  }

  return { position, su, er, getPosition }
}

// Firebaseからバスのデータを取ってきて位置情報の比較をする関数
export const useConparePosition = () => {
  const routelist = ["c","n","s","w","no"]
  
  const ConparePosition = (userPosition) => {
    const check = (userPosition, busLat, busLng) => {
      return Math.abs(userPosition.latitude - busLat) <= 0.00002 && Math.abs(userPosition.lng - busLng) <= 0.00002
    }
    let result
    if (busRTDB == null) {
      // ダミーデータでチェック
      const busData = {lat: 132.0000, lng: 55.0000, time: 150000}
      result = check(userPosition, busData.lat, busData.lng)
    } else {
      const busref = ref(busRTDB)
      // テストとして中央ルートのデータを一度だけ取得
      for (let i=0; i < routelist.length; i++) {
        get(child(busref, `BusLocation/route_${routelist[i]}`))
          .then((snapshot) => {
            let data = snapshot.data()
            result = check(userPosition, data.lat, data.lng)
          })
          .catch(error => {
            console.log(error)
          })
          if (result) {
            break
          }
        }
    }
    return result
  }
  return ConparePosition
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