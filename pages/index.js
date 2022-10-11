import React, { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from "next/router"
import { auth } from '../src/firebase/client'
import styles from '../styles/Home.module.css'
import Footer from '../src/components/Footer'
import Header from '../src/components/Header'


const Main = () => {
  const router = useRouter()

  //ログインしていない場合、ログインページに移動させる
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user){
        void router.push("/Login")
      } 
    })
  })
  

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

        <p>これはメインページです</p>
        <Footer />
      </main>
    </div>
  )
}
export default Main