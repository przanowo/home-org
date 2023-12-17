import React, { useState } from 'react'
import { todoLists } from '../../data/todo'
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native'

interface TodoItem {
  taskId: number
  taskName: string
  completed: boolean
}

interface TodoList {
  listId: number
  listTitle: string
  items: TodoItem[]
}

const Todo = () => {
  const [lists, setLists] = useState<TodoList[]>(todoLists) // Use dummy data
  const [newListTitle, setNewListTitle] = useState<string>('')
  const [newItemText, setNewItemText] = useState<string>('') // For new item text input

  const handleAddList = () => {
    console.log('Add new list')
  }
  // const handleAddList = () => {
  //   if (newListTitle) {
  //     const newList: TodoList = {
  //       listId: lists.length + 1,
  //       listTitle: newListTitle,
  //       items: [],
  //     };
  //     setLists([...lists, newList]);
  //     setNewListTitle('');
  //   }
  // };

  const handleItem = () => {
    console.log('Add new item')
  }
  const handleAddItem = (listId: number) => {
    //   if (newItemText) {
    //     const updatedLists = lists.map(list => {
    //       if (list.listId === listId) {
    //         const newItem: TodoItem = {
    //           taskId: list.items.length + 1,
    //           taskName: newItemText,
    //           completed: false,
    //         };
    //         return { ...list, items: [...list.items, newItem] };
    //       }
    //       return list;
    //     });
    //     setLists(updatedLists);
    //     setNewItemText(''); // Clear the input field
    //   }
    console.log('Add new item' + listId)
  }
  const handleCheckItem = (listId: number, taskId: number) => {
    console.log('Check item', listId, taskId)
  }

  const handleRemoveItem = (listId: number, taskId: number) => {
    console.log('Remove item', listId, taskId)
    // Implement logic to remove the item from the list
  }

  return (
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
            <Text style={styles.listTitle}>{item.listTitle}</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder='Add new item'
                value={newItemText}
                onChangeText={setNewItemText}
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
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      handleCheckItem(item.listId, todoItem.taskId)
                    }
                  >
                    <Text>Check</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      handleRemoveItem(item.listId, todoItem.taskId)
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
