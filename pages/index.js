import React from 'react'
import Head from 'next/head'

import styles from '../styles/Home.module.css'
import Footer from '../src/components/Footer'
import Header from '../src/components/Header'
import VerticalStepper from '../src/components/VerticalStepper'

//Topページ
const Main = () => {

  return (
    <div>
      <Head>
        <title>のっティGO | Notty-GO</title>
        <meta name="description" 
          content="のっティに乗ってスタンプをゲット！お得にのっティを利用しよう！" />
        <link rel="icon" href="/imgaes/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h2>のっティGOって？</h2>
          <ul>
            <li>のっティを利用してスタンプを貯めます</li>
            <li>貯めたスタンプを使って無料券を獲得できます</li>
          </ul>
        <VerticalStepper />
      {/* <Footer /> */}
      </main>
    </div>
  )
}
export default Main