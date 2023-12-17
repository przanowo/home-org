import { Button, StyleSheet, Text, TextInput } from 'react-native'
import { View } from '../../components/Themed'
import { useState } from 'react'

const CreateHome = () => {
  const [homeName, setHomeName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleCreateHome = () => {
    // Validate input and implement create home logic
    console.log('Create home')
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
