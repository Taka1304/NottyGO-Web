import React, { useEffect, useState } from 'react'
import { Button, Alert, CircularProgress, Box } from '@mui/material'
import { userAuth } from '../src/firebase/client'
import { useUserData, useConparePosition, useGetStamp, useUserPosition } from '../src/hooks/useStamp'
import Header from '../src/components/Layout/Header'
import Head from 'next/head'


const Stamp = () => {
  // ユーザーデータの状態を管理
  const [uid, setUid] = useState(null)
  const [flag, setFlag] = useState(false) // 今日スタンプを獲得しているかの判断に使用するフラグ
  const [available, setAvailable] = useState(false) // 位置情報が使用できるかのフラグ
  const { userData, getUserData } = useUserData()
  const { position, su, er, getPosition } = useUserPosition()
  const conparePosition = useConparePosition()
  const { success, error, getStamp } = useGetStamp()

  const today = new Date()
  const [t_year, t_month, t_day] = [today.getFullYear(), today.getMonth(), today.getDay()]
  
  // ボタン押したときの処理
  const handleSubmit = (event) => {
    event.preventDefault()
    // loadingモーダルを入れる


    getPosition()
    setTimeout(() => {
      if (conparePosition(position)) {
        getStamp(uid)
      }
    }, 5010)
  }

  const handleTestButton = ({flag}, event) => {
    event.preventDefault()

    if (flag) {

    } else {

    }
  }
  
  // First setData
  useEffect(() => {
    if ('geolocation' in navigator) {
      setAvailable(true);
    }
    userAuth.onAuthStateChanged((user) => {
      if (user) {
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


  return (
    <>
    <Head>
      <meta 
        name="description"
        content="のっティに乗ってスタンプをゲット！お得にのっティを利用しよう！">
      </meta>
    </Head>
    <Header />
    {<h3>現在 スタンプを{userData.stamp}個もっています</h3>}
    <hr />
      {available ? <Alert severity="success">位置情報が使用できます</Alert> : <Alert severity='warning' icon={false}><CircularProgress size={'1rem'}/>位置情報を取得中です</Alert>}
      {uid ? <Alert severity="success">ログインしています</Alert> : <Alert severity='error'>ログインしていません</Alert>}
      {!flag ? <Alert severity="success">今日はまだスタンプを獲得していません</Alert> : <Alert severity='error'>今日は既にスタンプを獲得しています</Alert>}
      <Box sx={{display: 'flex', justifyContent: 'center', my: 3}}>
        {available && uid && !flag ? 
          <Button 
            size='large' 
            variant='contained' 
            sx={{justifyContent: "center"}} 
            onClick={handleSubmit}>
              スタンプをゲット
          </Button> : 
          <Button 
            variant='contained' 
            sx={{justifyContent: "center"}} 
            disabled>
              上記項目を満たしてください
          </Button>}
        {/*<hr /> <br /> 
        <Button 
          variant='contained'
          onClick={ () => handleTestButton(true)}
        >
          絶対成功するボタン
        </Button>
        <Button 
          variant='contained'
          onClick={ () => handleTestButton(false)}
        >
          絶対失敗するボタン
        </Button> */}
      </Box>
      {success && !error ? <Alert severity='success'>スタンプ1つ獲得しました!</Alert>: null}
      {error && !success ? <Alert severity='error'>エラー</Alert>:null}
    </>
  )
}



export default Stamp