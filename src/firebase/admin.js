// import { initializeApp, cert, getApps } from 'firebase-admin/app'
// import { getFirestore } from 'firebase-admin/firestore'

// /*
// getStaticPropsなどのサーバーサイドでデータベースが必要になる場合、
// こちらの特権環境でのデータベースを使う
// */

// if (!getApps()?.length) {
//   initializeApp({
//     credential: cert(
//       JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY as string)
//     ),
//   })
// }

// export const adminDB = getFirestore()