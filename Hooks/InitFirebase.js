
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, updateDoc, deleteField  } from 'firebase/firestore/lite'

// Подключаем firebase
const firebaseConfig = {
  apiKey: "AIzaSyB3AAFFdJfpWcIXvYwG-j_ABbi5wqKtcA4",
  authDomain: "li7-time.firebaseapp.com",
  projectId: "li7-time",
  storageBucket: "li7-time.appspot.com",
  messagingSenderId: "908352781697",
  appId: "1:908352781697:web:b9ac50679c98485b14bc80"
};
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db