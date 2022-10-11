import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Footer } from '../src/components/Footer'
import { Header } from '../src/components/Header'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>のっティGO</title>
        <meta name="description" 
          content="のっティに乗ってポイントをゲット！お得にのっティを利用しよう！" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        これはメインページです
      </main>

      <Footer />
    </div>
  )
}
