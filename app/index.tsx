import { Link, router } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Link style={styles.input} href='/create/'>
        Create Home
      </Link>
      <Link style={styles.input} href='/login/'>
        Login
      </Link>
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/users/[id]',
            params: { id: 2 },
          })
        }
      >
        <Text>Go to user 2</Text>
      </Pressable>
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
    textAlign: 'center',
  },
  forgotPassword: {
    marginTop: 15,
    alignSelf: 'center',
    color: 'blue',
  },
})
export default HomePage
