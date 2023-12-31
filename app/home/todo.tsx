import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native'
import {
  addDoc,
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  arrayUnion,
  updateDoc,
  arrayRemove,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FIREBASE_DB } from '../../firebaseConfig'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import useFetchHomeId from '../hooks/home'

interface TodoItem {
  taskId: string
  taskName: string
  completed: boolean
}

interface TodoList {
  listId: string
  listTitle: string
  items: TodoItem[]
}

const Todo = () => {
  const homeId = useFetchHomeId()
  const [newListTitle, setNewListTitle] = useState<string>('')
  const [newItemTexts, setNewItemTexts] = useState<{ [key: string]: string }>(
    {}
  )
  const [lists, setLists] = useState<TodoList[]>([])

  useEffect(() => {
    if (!homeId) {
      return
    }
    const getTodoLists = async () => {
      const todoListsRef = collection(FIREBASE_DB, 'homes', homeId, 'todoLists')
      const querySnapshot = await getDocs(todoListsRef)
      const lists: TodoList[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        lists.push({
          listId: doc.id,
          listTitle: data.listTitle as string,
          items: data.items ? (data.items as TodoItem[]) : [],
        })
      })
      setLists(lists)
    }
    getTodoLists()
  }, [homeId])

  const handleAddList = async () => {
    if (newListTitle) {
      try {
        const todoListsRef = collection(
          FIREBASE_DB,
          'homes',
          homeId,
          'todoLists'
        )
        const docRef = await addDoc(todoListsRef, {
          listTitle: newListTitle,
          items: [],
        })
        // Fetch new list of todo lists
        const newList = {
          listId: docRef.id,
          listTitle: newListTitle,
          items: [],
        }
        setLists((prevLists) => [...prevLists, newList])

        setNewListTitle('')
      } catch (e) {
        Alert.alert('Error', 'Error creating list.')
      }
    }
  }

  const handleAddItem = async (listId: string) => {
    const itemText = newItemTexts[listId]
    if (itemText) {
      try {
        const listRef = doc(FIREBASE_DB, 'homes', homeId, 'todoLists', listId)
        const newItem = {
          taskId: new Date().getTime().toString(), // Generate a unique ID
          taskName: itemText,
          completed: false,
        }
        await updateDoc(listRef, {
          items: arrayUnion(newItem),
        })

        setLists((prevLists) =>
          prevLists.map((list) =>
            list.listId === listId
              ? { ...list, items: [...list.items, newItem] }
              : list
          )
        )

        setNewItemTexts((prev) => ({ ...prev, [listId]: '' }))
      } catch (e) {
        Alert.alert('Error', 'Error adding item.')
      }
    }
  }
  const handleNewItemTextChange = (listId: string, text: string) => {
    setNewItemTexts((prev) => ({ ...prev, [listId]: text }))
  }

  // const handleCheckItem = (listId: string, taskId: string) => {
  //   console.log('Check item', listId, taskId)
  // }

  const handleRemoveList = async (listId: string) => {
    if (listId) {
      try {
        await deleteDoc(doc(FIREBASE_DB, 'homes', homeId, 'todoLists', listId))
        const newLists = lists.filter((list) => list.listId !== listId)
        setLists(newLists)
      } catch (e: any) {
        Alert.alert(e, 'Error deleting list.')
      }
    }
  }
  const handleRemoveListItem = async (listId: string, taskId: string) => {
    if (listId && taskId) {
      try {
        const listRef = doc(FIREBASE_DB, 'homes', homeId, 'todoLists', listId)

        // Find the item to remove
        const list = lists.find((list) => list.listId === listId)
        const itemToRemove = list?.items.find((item) => item.taskId === taskId)

        if (itemToRemove) {
          // Update the document in Firestore
          await updateDoc(listRef, {
            items: arrayRemove(itemToRemove),
          })

          // Update the local state
          const newLists = lists.map((list) =>
            list.listId === listId
              ? {
                  ...list,
                  items: list.items.filter((item) => item.taskId !== taskId),
                }
              : list
          )
          setLists(newLists)
        }
      } catch (e) {
        Alert.alert('Error', 'Error deleting item.')
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder='Create New List'
            value={newListTitle}
            onChangeText={setNewListTitle}
          />
          <View style={styles.buttonContainer}>
            <Button title='Add' onPress={handleAddList} />
          </View>
        </View>

        <FlatList
          data={lists}
          keyExtractor={(item) => `list-${item.listId}`}
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              <View style={styles.listNameRow}>
                <Text style={styles.listTitle}>{item.listTitle}</Text>
                <Button
                  title='Remove List'
                  onPress={() => handleRemoveList(item.listId)}
                />
              </View>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder='Add new item'
                  value={newItemTexts[item.listId] || ''}
                  onChangeText={(text) =>
                    handleNewItemTextChange(item.listId, text)
                  }
                />
                <Button
                  title='Add Item'
                  onPress={() => handleAddItem(item.listId)}
                />
              </View>
              {item.items.map((todoItem) => (
                <View key={todoItem.taskId} style={styles.todoItem}>
                  <Text
                    style={{
                      textDecorationLine: todoItem.completed
                        ? 'line-through'
                        : 'none',
                    }}
                  >
                    {todoItem.taskName}
                  </Text>

                  {/* Add buttons or touchable components to handle check and remove */}
                  <View style={styles.buttonContainere}>
                    {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      handleCheckItem(item.listId, todoItem.taskId)
                    }
                  >
                    <Text>Check</Text>
                  </TouchableOpacity> */}

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        handleRemoveListItem(item.listId, todoItem.taskId)
                      }
                    >
                      <Text>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
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
    padding: 0,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  input: {
    flex: 1,
    marginRight: 10,
    marginTop: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },

  listContainer: {
    marginTop: 5,
    padding: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  buttonContainer: {
    overflow: 'hidden', // Needed if borderRadius is set
    height: 50,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 5,
  },
  buttonContainere: {
    flexDirection: 'row',
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#eaeaea',
    borderRadius: 5,
    overflow: 'hidden', // Needed if borderRadius is set
  },
  button: {
    marginHorizontal: 5,
  },
  // Add more styles for other components
})

export default Todo
