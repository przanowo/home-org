import { useState } from 'react'
import { FIREBASE_DB } from '../../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  Alert,
} from 'react-native'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import useFetchHomeId from '../hooks/home'

interface Spending {
  id: string
  expenseType: string
  description: string
  amount: number
  date: Date
  month: number
}

const Spendings = () => {
  const homeId = useFetchHomeId()
  const [expenseType, setExpenseType] = useState<string>('grocery')
  const [description, setDescription] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [date, setDate] = useState<Date>(new Date())
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date
    setShowDatePicker(Platform.OS === 'ios')
    setDate(currentDate)
    setMonth(currentDate.getMonth() + 1)
  }

  const addSpending = async () => {
    if (!homeId) {
      return
    }
    if (amount) {
      try {
        await addDoc(collection(FIREBASE_DB, 'homes', homeId, 'spendings'), {
          expenseType,
          description,
          amount,
          date,
          month,
        })
        Alert.alert('Success', 'Spending added successfully.')
      } catch (e) {
        Alert.alert('Error', 'Error adding spending.')
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Button title='Add Spending' onPress={addSpending} />
        </View>
        <Text>Description:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          placeholder='Enter description'
        />

        <Text>Amount:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAmount}
          value={amount}
          keyboardType='numeric'
          placeholder='Enter amount'
        />
        <Picker
          selectedValue={expenseType}
          onValueChange={(itemValue, itemIndex) => setExpenseType(itemValue)}
        >
          <Picker.Item label='Grocery' value='grocery' />
          <Picker.Item label='Gas' value='gas' />
          <Picker.Item label='Bills' value='bills' />
          <Picker.Item label='Food & Drink' value='food&drink' />
          <Picker.Item label='Travel' value='travel' />
          <Picker.Item label='Beauty' value='beauty' />
          <Picker.Item label='Car' value='car' />
          <Picker.Item label='Rent' value='rent' />
          <Picker.Item label='Other' value='other' />
        </Picker>

        <Button title='Select Date' onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode='date'
            display='default'
            onChange={onChangeDate}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

export default Spendings
