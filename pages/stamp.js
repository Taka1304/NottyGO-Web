import React, { useEffect, useState } from 'react'
import { useStampNumber } from '../src/hooks/useStamp'
import { ref, get, child } from 'firebase/database'
import { busRTDB } from '../src/firebase/client'

const Stamp = () => {
  const [data, setData] = useState({
    lat: 0,
    lng: 0,
    time: 0
  })
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
  },[])
  
  return (
    <>
      <div>stamp</div>
      <p>lat: {data.lat}</p>
      <p>lng: {data.lng}</p>
      <p>time: {data.time}</p>
    </>
  )
}



export default Stamp