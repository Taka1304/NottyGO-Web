import dynamic from "next/dynamic";
import React, { useEffect, useState } from 'react'
import { userAuth } from '../src/firebase/client'
import { Button, Alert } from '@mui/material'
import { useUserData, useConparePosition, useGetStamp, useUserPosition } from '../src/hooks/useStamp'
import Header from '../src/components/Header'

const Stamp = () => {
  // ユーザーデータの状態を管理
  const [uid, setUid] = useState(null)  
  const { userData, getUserData } = useUserData()
  const { position, su, er, getPosition } = useUserPosition()
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  
  useEffect(() => {
    getPosition()
    userAuth.onAuthStateChanged((user) => {
      if (!user){
        // void router.push("/login")
      } else {
        setUid(user.uid)
        getUserData(user.uid)
      }
    }) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
    <Header />
      {/* 確認用 */}
      {uid ? <p>{uid}</p> : <p>ログインしていません</p> }
      <div>stamp</div>
      {userData ? <div>
      <p>updateAt:{userData.updateAt.seconds}</p>
      <p>stampnum:{userData.stamp}</p>
      <p>coupon:{userData.coupon}</p>
      </div>: null}
      <hr />
      <p>mylat: {position.lat}</p>
      <p>mylng: {position.lng}</p>
        {su ? <Alert severity="success">Position OK</Alert> : <Alert severity='error'>位置情報を取得中です</Alert>}
        {uid ? <Alert severity="success">Login OK</Alert> : <Alert severity='error'>ログインしていません</Alert>}
      {uid && position.lat!= 0 ? <Button onClick={handleSubmit}>スタンプをゲット</Button> : <Button disabled>上記項目を満たしてください</Button>}
    </>
  )
}



export default Stamp