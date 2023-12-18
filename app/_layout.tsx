import React from 'react'
import { Stack } from 'expo-router'
import { FIREBASE_AUTH } from '../firebaseConfig'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'

const RootLayout = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user)
    })
  }, [])

  return user ? (
    <Stack>
      <Stack.Screen name='home' options={{ headerShown: false }} />
    </Stack>
  ) : (
    <Stack>
      <Stack.Screen name='index' options={{ headerTitle: 'Home Assistant' }} />
      <Stack.Screen
        name='create/index'
        options={{ headerTitle: 'Create Home' }}
      />
      <Stack.Screen name='login/index' options={{ headerTitle: 'Login' }} />
    </Stack>
  )
}

export default RootLayout
