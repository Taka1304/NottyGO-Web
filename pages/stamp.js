import React, { useEffect, useState } from 'react'
import { Button, Alert, CircularProgress } from '@mui/material'
import { userAuth } from '../src/firebase/client'
import { useUserData, useConparePosition, useGetStamp, useUserPosition } from '../src/hooks/useStamp'
import Header from '../src/components/Header'


const Stamp = () => {
  // ユーザーデータの状態を管理
  const [uid, setUid] = useState(null)
  const [flag, setFlag] = useState(false)
  const { userData, getUserData } = useUserData()
  const { position, su, er, getPosition } = useUserPosition()
  const conparePosition = useConparePosition()
  const { success, error, getStamp } = useGetStamp()

  const today = new Date()
  const [t_year, t_month, t_day] = [today.getFullYear(), today.getMonth(), today.getDay()]
  // ボタン押したときの処理
  const handleSubmit = (event) => {
    event.preventDefault()
    if (conparePosition(position)) {
      getStamp(uid)
    } else {
      console.log("失敗")
    }
  }
  
  // First setData
  useEffect(() => {
    getPosition()
    userAuth.onAuthStateChanged((user) => {
      if (!user){
        // void router.push("/login")
      } else {
        setUid(user.uid)
        getUserData(user.uid)
        const date = userData.date
        const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDay()]
        if (year === t_year && month === t_month && day === t_day) {
          setFlag(true)
        }
      }
    }) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  useEffect(() => {
    if (uid) {
      getUserData(uid)
      const date = userData.date
      const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDay()]
      if (year === t_year && month === t_month && day === t_day) {
        setFlag(true)
      }
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[success])

  // const date = new Date(userData.updateAt.seconds * 1000)

  return (
    <>
    <Header />
      {/* 確認用 */}
      {uid ? <p>{uid}</p> : <p>ログインしていません</p> }
      <div>stamp</div>
      {userData ? <div>
      <p>Flag: {flag ? "true" : "false"}</p>
      <p>stampnum:{userData.stamp}</p>
      <p>coupon:{userData.coupon.length}</p>
      </div>: null}
      <hr />
      <p>mylat: {position.lat}</p>
      <p>mylng: {position.lng}</p>
      
      <hr />
      {su ? <Alert severity="success">Position OK</Alert> : <Alert severity='warning' icon={false}><CircularProgress size={'1rem'}/>位置情報を取得中です</Alert>}
      {uid ? <Alert severity="success">Login OK</Alert> : <Alert severity='error'>ログインしていません</Alert>}
      {!flag ? <Alert severity="success">今日はまだスタンプを獲得していません</Alert> : <Alert severity='error'>今日は既にスタンプを獲得しています</Alert>}
      {uid && su && !flag ? <Button variant='contained' onClick={handleSubmit}>スタンプをゲット</Button> : <Button variant='contained' disabled>上記項目を満たしてください</Button>}
      {success && !error ? <Alert severity='success'>スタンプ1つ獲得しました!</Alert>: null}
      {error && !success ? <Alert severity='error'>エラー</Alert>:null}
    </>
  )
}



export default Stamp