import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerTitle: 'Home Assistant' }} />
      <Stack.Screen name='users/[id]' options={{ headerTitle: 'User Page' }} />
      <Stack.Screen
        name='create/index'
        options={{ headerTitle: 'Create Home' }}
      />
      <Stack.Screen name='login/index' options={{ headerTitle: 'Login' }} />
      <Stack.Screen name='home' options={{ headerShown: false }} />
    </Stack>
  )
}

export default RootLayout
