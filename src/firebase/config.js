import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.KEY,
  authDomain: "secretaligner-test.firebaseapp.com",
  projectId: "secretaligner-test",
  storageBucket: "secretaligner-test.appspot.com",
  messagingSenderId: "109065271476",
  appId: process.env.API
};

initializeApp(firebaseConfig)

const db = getFirestore()

export { db }