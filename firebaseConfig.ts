// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBgDcxxBniYly_vYJhD7Mvfn2KQs58w950',
  authDomain: 'home-org-dcc03.firebaseapp.com',
  projectId: 'home-org-dcc03',
  storageBucket: 'home-org-dcc03.appspot.com',
  messagingSenderId: '412583839755',
  appId: '1:412583839755:web:abf742aa1d04e9543e9f0e',
}

// Initialize Firebase

export const FIREBASE_APP = initializeApp(firebaseConfig)
// Initialize Auth with AsyncStorage persistence
initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
})
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
