import { Button, StyleSheet, Text, TextInput, Alert } from 'react-native'
import { View } from '../../components/Themed'
import { useState } from 'react'
import { useNavigation } from 'expo-router'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { FIREBASE_DB } from '../../firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'

const LoginPage = () => {
  const [homeName, setHomeName] = useState('')
  const [password, setPassword] = useState('')

  const navigation: any = useNavigation()

  const handleLogin = async () => {
    const homesRef = collection(FIREBASE_DB, 'homes')

    try {
      const q = query(homesRef, where('homeName', '==', homeName))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        Alert.alert('Home Not Found', 'This home does not exist.')
        return
      }

      const userData = querySnapshot.docs[0].data()
      const userEmail = userData.ownerEmail

      await signInWithEmailAndPassword(FIREBASE_AUTH, userEmail, password)
      navigation.navigate('home')
      // router.push('/home/')
      Alert.alert('Success', 'Logged in successfully.')
    } catch (e) {
      Alert.alert('Error', 'Error logging in.')
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
    </TouchableWithoutFeedback>
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
