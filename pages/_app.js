import '../styles/globals.css'
import Head from 'next/head'
import { ThemeProvider, createTheme } from '@mui/material'
import { SEO } from '../next-seo.config'
import { DefaultSeo } from 'next-seo'
import { lightGreen } from '@mui/material/colors'

//全ページに反映させる処理を記述する
const MyApp = ({ Component, pageProps }) => {
  //レイアウトのテーマを設定
  const theme = createTheme({
    palette: {
      primary: lightGreen,
      secondary: {
        main: '#33691e',
      },
    },
  })
  
  return (
  <>
  <ThemeProvider theme={theme}>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <DefaultSeo {...SEO} />
    <Component {...pageProps} />
  </ThemeProvider>
  </>
)}

export default MyApp
