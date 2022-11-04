import React, { useEffect, useState } from 'react'
import { useUserData } from '../src/hooks/useStamp'
import { ref, get, child } from 'firebase/database'
import { busRTDB, userAuth } from '../src/firebase/client'

const Stamp = () => {
  // ユーザーデータの状態を管理
  const [uid, setUid] = useState(null)
  // バスの位置情報の状態を管理
  const [busData, setBusData] = useState({
    lat: 0,
    lng: 0,
    time: 0
  })
  
  const { userData, getUserData } = useUserData()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (busRTDB == null) {
      // ダミーデータ
      setBusData({lat: 132.0000, lng: 55.0000, time: 150000})
    } else {
      const busref = ref(busRTDB)
      // テストとして中央ルートのデータを一度だけ取得
      get(child(busref, "BusLocation/route_c"))
        .then((snapshot) => {
          snapshot.exists() ? setBusData(snapshot.val()) : null
        })
        .catch(error => {
          console.log(error)
        })
    }
    userAuth.onAuthStateChanged((user) => {
      if (!user){
        // void router.push("/login")
      } else {
        setUid(user.uid)
        getUserData(user.uid)
      }
    }) 
  },[])
  return (
    <>
      {/* 確認用 */}
      {uid ? <p>{uid}</p> : <p>ログインしていません</p> }
      <div>stamp</div>
      <p>lat: {busData.lat}</p>
      <p>lng: {busData.lng}</p>
      <p>time: {busData.time}</p>
      {userData ? <div>
      <p>updateAt:{userData.updateAt.seconds}</p>
      <p>stampnum:{userData.stamp}</p>
      </div>: null}
    </>
  )
}



export default Stamp