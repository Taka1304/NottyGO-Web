import { useState } from "react"
import { getDoc, doc, collection, serverTimestamp, increment, updateDoc } from "firebase/firestore"
import { ref, get, child } from "firebase/database"
import { userDB, busRTDB } from "../firebase/client"

// ユーザーのスタンプデータを取得するための関数
export const useUserData = () => {
  const [userData, setUserData] = useState({
    email: "",
    stamp: 0,
    updateAt: {
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
    lng: 0,
    accuracy: 0 // 精度(実質誤差)[m]
  })
  const [er, setError] = useState(null)
  const [su, setSuccess] = useState(false)

  const options = {
    maximumAge: 1000,  // キャッシュをほぼ利用不可
    timeout: 4900, // 4900ミリ秒(4.9秒)まで許可
    enableHighAccuracy: true  // 高精度を求める
  }
  const onSuccess = (pos) => {
    // console.log(pos.coords)
    setPosition({lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy})
  }
  const onError = (e) => setError(e.message)

  const getPosition = () => {
    console.log("Search Current Position")  // 探索開始
    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, options)
    setSuccess(false)
    // 5秒で終了する
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
  
  const conparePosition = (userPosition) => {
    const check = (userPosition, busLat, busLng) => {
      // 緯度1度あたり110.946km、経度1度あたり87.4082kmと仮定し、誤差を10+accuracy[m]に設定
      const radius = 0.005 + userPosition.accuracy / 2000
      const allowable_lat = radius / 110.946
      const allowable_lng = radius / 87.4082
      // console.log(Math.abs(userPosition.lat - busLat))
      return Math.abs(userPosition.lat - busLat) <= allowable_lat && Math.abs(userPosition.lng - busLng) <= allowable_lng
    }
    let result = false
    if (busRTDB == null) {
      // ダミーデータでチェック
      const busData = {lat: 36.5264896, lng: 136.6294528, time: 150000}
      result = check(userPosition, busData.lat, busData.lng)
      // result=true
    } else {
      const busref = ref(busRTDB)
      for (let i=0; i < routelist.length; i++) {
        get(child(busref, `BusLocation/route_${routelist[i]}`))
          .then(snapshot => {
            let data = snapshot.val()
            // timeを見てデータが正しいか確認


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
  return conparePosition
}

// スタンプを取得した場合のFirestore上の処理
export const useGetStamp = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState()

  const getStamp = async (uid) => {
    const userRef = doc(collection(userDB, '/users'), uid)
    try {
      //データの更新
      await updateDoc(userRef, {
        stamp: increment(1),
        updateAt: serverTimestamp()
      })
      setSuccess(true)
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  return { success, error, getStamp }
}