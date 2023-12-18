import { Alert, Button, StyleSheet, Text, TextInput } from 'react-native'
import { View } from '../../components/Themed'
import { useState } from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { FIREBASE_DB } from '../../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore'

const CreateHome = () => {
  const [homeName, setHomeName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const validateInput = () => {
    // Simple email validation
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(ownerEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.')
      return false
    }

    // Validate home name (add your own logic, e.g., min length)
    if (homeName.length < 3) {
      Alert.alert(
        'Invalid Home Name',
        'Home name must be at least 3 characters long.'
      )
      return false
    }

    // Validate passwords
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'The passwords do not match.')
      return false
    }

    return true
  }

  const handleCreateHome = async () => {
    if (!validateInput()) {
      return
    }

    try {
      const homesRef = collection(FIREBASE_DB, 'homes')
      const q = query(homesRef, where('homeName', '==', homeName))

      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        Alert.alert('Home Exists', 'This home name is already taken.')
        return
      }

      await createUserWithEmailAndPassword(FIREBASE_AUTH, ownerEmail, password)

      await addDoc(homesRef, { homeName, ownerEmail })
      Alert.alert('Success', 'Home created successfully.')
      // Navigate to next screen or reset state
    } catch (error) {
      console.error('Error creating home: ', error)
      Alert.alert('Error', 'An error occurred while creating the home.')
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
          onChangeText={setOwnerEmail}
          value={ownerEmail}
          placeholder='Owner Email'
          keyboardType='email-address'
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder='Password'
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder='Confirm Password'
          secureTextEntry
        />
        <Button title='Create Home' onPress={handleCreateHome} />
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
export default CreateHome
