import '../styles/globals.css'
import Head from 'next/head'
import { ThemeProvider, createTheme } from '@mui/material'

//全ページに反映させる処理を記述する
function MyApp({ Component, pageProps }) {
  const theme = createTheme()
  return (
  <ThemeProvider theme={theme}>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Component {...pageProps} />
  </ThemeProvider>
)}

export default MyApp
