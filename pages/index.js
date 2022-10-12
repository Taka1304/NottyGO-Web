import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from "next/router"
import { Button } from '@mui/material'

import { auth } from '../src/firebase/client'
import styles from '../styles/Home.module.css'
import Footer from '../src/components/Footer'
import Header from '../src/components/Header'
import { useLogout } from '../src/hooks/useAuth'

const Main = () => {
  const router = useRouter()
  const [user,setUser] = useState(null)
  const { logout } = useLogout()

  //ログインしていない場合、ログインページに移動させる
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user){
        void router.push("/Login")
      } else {
        setUser(user)
        console.log(user.email)
      }
    })
  },[])
  
  const handleLogout = () => {
    logout()
    void router.push("/Login")
  }

  return user ? (
    <div className={styles.container}>
      <Head>
        <title>のっティGO</title>
        <meta name="description" 
          content="のっティに乗ってポイントをゲット！お得にのっティを利用しよう！" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <Button onClick={handleLogout} >ログアウト</Button>
        <p>これはメインページです</p>
        <Footer />
      </main>
    </div>
  ): 
  <>
  </>
}
export default Main