import React from 'react'
import Head from 'next/head'

import styles from '../styles/Home.module.css'
import Footer from '../src/components/Footer'
import Header from '../src/components/Header'

//Topページ
const Main = () => {

  return (
    <div>
      <Head>
        <title>のっティGO</title>
        <meta name="description" 
          content="のっティに乗ってポイントをゲット！お得にのっティを利用しよう！" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <p>これはメインページです</p>
      {/* <Footer /> */}
      </main>
    </div>
  )
}
export default Main