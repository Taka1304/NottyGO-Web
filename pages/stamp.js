import React, { useEffect, useState } from 'react'
import { useStampNumber } from '../src/hooks/useStamp'
import { ref, get, child } from 'firebase/database'
import { busRTDB, userAuth } from '../src/firebase/client'

const Stamp = () => {
  const [uid, setUid] = useState(null)
  const [data, setData] = useState({
    lat: 0,
    lng: 0,
    time: 0
  })
  
  const { stamp, stampNumber } = useStampNumber()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const busref = ref(busRTDB)
    //テストとして中央ルートのデータを一度だけ取得
    get(child(busref, "BusLocation/route_c"))
      .then((snapshot) => {
        snapshot.exists() ? setData(snapshot.val()) : null
      })
      .catch(error => {
        console.log(error)
      })
    userAuth.onAuthStateChanged((user) => {
      if (!user){
        // void router.push("/login")
      } else {
        setUid(user.uid)
        stampNumber(user.uid)
      }
    })
  },[])
  return (
    <>
      {uid ? <p>{uid}</p> : <p>ログインしていません</p> }
      <div>stamp</div>
      <p>lat: {data.lat}</p>
      <p>lng: {data.lng}</p>
      <p>time: {data.time}</p>

      <div>
      <p>stampnum:{stamp}</p>
      </div>
    </>
  )
}



export default Stamp