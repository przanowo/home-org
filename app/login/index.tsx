import { Button, StyleSheet, Text, TextInput } from 'react-native'
import { View } from '../../components/Themed'
import { useState } from 'react'
import { router } from 'expo-router'

const LoginPage = () => {
  const [homeName, setHomeName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    console.log('Login')
    router.push('/home/')
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setHomeName}
        value={homeName}
        placeholder='Home Name'
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder='Password'
        secureTextEntry
      />
      <Button title='Login' onPress={handleLogin} />
      <Text style={styles.forgotPassword}>Forgot Password?</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  forgotPassword: {
    marginTop: 15,
    alignSelf: 'center',
    color: 'blue',
  },
})
export default LoginPage
