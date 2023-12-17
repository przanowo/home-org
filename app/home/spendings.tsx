import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
} from 'react-native'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'

const Spendings = () => {
  const [expenseType, setExpenseType] = useState<string>('grocery')
  const [description, setDescription] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [date, setDate] = useState<Date>(new Date())
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date
    setShowDatePicker(Platform.OS === 'ios')
    setDate(currentDate)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Spending</Text>

      <Text>Expense Type:</Text>
      <Picker
        selectedValue={expenseType}
        onValueChange={(itemValue, itemIndex) => setExpenseType(itemValue)}
      >
        <Picker.Item label='Grocery' value='grocery' />
        <Picker.Item label='Car' value='car' />
        <Picker.Item label='Beauty' value='beauty' />
        <Picker.Item label='Food & Drink' value='food&drink' />
        <Picker.Item label='Bills' value='bills' />
        <Picker.Item label='Rent' value='rent' />
        <Picker.Item label='Travel' value='travel' />
        <Picker.Item label='Gas' value='gas' />
        <Picker.Item label='Other' value='other' />
      </Picker>

      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
      />

      <Text>Amount:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        keyboardType='numeric'
      />

      <Text>Date:</Text>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
})

export default Spendings
