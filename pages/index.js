import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from "next/router"
import { Button } from '@mui/material'

import { userAuth } from '../src/firebase/client'
import styles from '../styles/Home.module.css'
import Footer from '../src/components/Footer'
import Header from '../src/components/Header'
import { useLogout } from '../src/hooks/useAuth'

//Topページ
const Main = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const { logout } = useLogout()
  
  useEffect(() => {
    //ログイン状態の確認
    userAuth.onAuthStateChanged((user) => {
      if (!user){
        // void router.push("/login")
      } else {
        setUser(user)
      }
    })
  },)
  
  const handleLogout = () => {
    logout()
    void router.push("/login")
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>のっティGO</title>
        <meta name="description" 
          content="のっティに乗ってポイントをゲット！お得にのっティを利用しよう！" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        {!user ? <p>ログインしていません</p> : <p>{user.email}でログイン中です</p>}
        <Button onClick={handleLogout} >ログアウト</Button>
        <p>これはメインページです</p>
        <Footer />
      </main>
    </div>
  )
}
export default Main