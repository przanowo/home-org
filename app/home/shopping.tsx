import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useEffect, useState } from 'react'
import { FIREBASE_DB } from '../../firebaseConfig'
import {
  addDoc,
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'

interface ShoppingItem {
  id: string
  name: string
  bought: boolean
}

const Shopping = () => {
  const [shoppingItem, setShoppingItem] = useState<string>('')
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]) // Use dummy data
  // console.log('shoppingItem1', shoppingItem)
  console.log('shoppingItems2', shoppingItems)

  useEffect(() => {
    const getShoppingItems = async () => {
      const q = query(collection(FIREBASE_DB, 'shoppingItems'))
      const querySnapshot = await getDocs(q)
      const items: ShoppingItem[] = []
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          name: doc.data().name as string,
          bought: doc.data().bought as boolean,
        })
      })
      setShoppingItems(items)
    }
    getShoppingItems()
  }, [])

  const addShoppingItem = async () => {
    if (shoppingItem) {
      try {
        const docRef = await addDoc(collection(FIREBASE_DB, 'shoppingItems'), {
          name: shoppingItem,
          bought: false,
        })
        // Fetch the newly added item and update the state
        const newItem = {
          id: docRef.id,
          name: shoppingItem,
          bought: false,
        }

        setShoppingItems((prevItems) => [...prevItems, newItem])
        setShoppingItem('')
      } catch (e) {
        Alert.alert('Error', 'Error adding shopping item.')
      }
    }
  }
  const deleteShoppingItem = async (id: string) => {
    console.log('deleteShoppingItem', id)
    if (id) {
      try {
        await deleteDoc(doc(FIREBASE_DB, 'shoppingItems', id))
        const newItems = shoppingItems.filter((item) => item.id !== id)
        setShoppingItems(newItems)
      } catch (e) {
        Alert.alert('Error', 'Error deleting shopping item.')
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Shopping List</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Add new item'
            value={shoppingItem}
            onChangeText={setShoppingItem} // To be implemented
          />
          <Button title='Add' onPress={addShoppingItem} />
        </View>

        <FlatList
          data={shoppingItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.itemText}>{item.name}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteShoppingItem(item.id)}
              >
                <Text style={styles.deleteButtonText}>Bought</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // ... other styles ...
})

export default Shopping
