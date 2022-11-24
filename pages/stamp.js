import React, { useEffect, useState } from 'react'
import { userAuth } from '../src/firebase/client'
import { Button, Alert, CircularProgress } from '@mui/material'
import { useUserData, useConparePosition, useGetStamp, useUserPosition } from '../src/hooks/useStamp'
import Header from '../src/components/Header'


const Stamp = () => {
  // ユーザーデータの状態を管理
  const [uid, setUid] = useState(null)
  const { userData, getUserData } = useUserData()
  const { position, su, er, getPosition } = useUserPosition()
  const conparePosition = useConparePosition()
  const { success, error, getStamp } = useGetStamp()
  const handleSubmit = (event) => {
    event.preventDefault()
    if (conparePosition(position)) {
      getStamp(uid)
    } else {
      console.log("失☆敗")
    }
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
      <p>updateAt:{new Date(userData.updateAt.seconds * 1000).toString()}</p>
      <p>stampnum:{userData.stamp}</p>
      <p>coupon:{userData.coupon}</p>
      </div>: null}
      <hr />
      <p>mylat: {position.lat}</p>
      <p>mylng: {position.lng}</p>
      {su ? <Alert severity="success">Position OK</Alert> : <Alert severity='warning' icon={false}><CircularProgress />位置情報を取得中です</Alert>}
      {uid ? <Alert severity="success">Login OK</Alert> : <Alert severity='error'>ログインしていません</Alert>}
      {/* 日付の確認が必要 */}
      {uid && su ? <Button onClick={handleSubmit}>スタンプをゲット</Button> : <Button disabled>上記項目を満たしてください</Button>}
      {success && !error ? <Alert severity='success'>スタンプ1つ獲得しました!</Alert>: null}
      {error && !success ? <Alert severity='error'>エラー</Alert>:null}
    </>
  )
}



export default Stamp