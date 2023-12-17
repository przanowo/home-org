import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { shoppingItems } from '../../data/shopping'

const Shopping = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Add new item'
          // onChangeText={...} // To be implemented
        />
        <Button
          title='Add'
          onPress={() => {}} // To be implemented
        />
      </View>

      <FlatList
        data={shoppingItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item.name}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {}} // To be implemented
            >
              <Text style={styles.deleteButtonText}>Bought</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
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
