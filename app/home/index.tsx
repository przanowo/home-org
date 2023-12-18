import { useEffect, useState } from 'react'
import { FIREBASE_DB } from '../../firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { StyleSheet, Text, View } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import { Picker } from '@react-native-picker/picker'

interface SpendingItem {
  id: string
  description: string
  expenseType: string
  date: Date
  month: number
  amount: number
}

interface PieChartData {
  name: string
  amount: number
  color: string
  legendFontColor: string
  legendFontSize: number
}

const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  )
  const [filteredSpendings, setFilteredSpendings] = useState<SpendingItem[]>([])

  console.log('selectedMonth', selectedMonth)
  console.log('filteredSpendings', filteredSpendings)

  useEffect(() => {
    const getSpendingItemsPerMonth = async () => {
      // Assuming selectedMonth is 1-based (January is 1, February is 2, etc.)
      const q = query(
        collection(FIREBASE_DB, 'spendings'),
        where('month', '==', selectedMonth)
      )
      const querySnapshot = await getDocs(q)
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id as string,
        description: doc.data().description as string,
        expenseType: doc.data().expenseType as string,
        date: doc.data().date.toDate() as Date, // Convert Firestore Timestamp to JavaScript Date
        amount: doc.data().amount as number,
        month: doc.data().month as number,
      }))

      setFilteredSpendings(items)
    }
    getSpendingItemsPerMonth()
  }, [selectedMonth])

  const spendingData = (): PieChartData[] => {
    const sumsByCategory: { [key: string]: number } = {}

    filteredSpendings.forEach((spending) => {
      const expenseType = spending.expenseType
      const amount = Number(spending.amount)

      console.log('category', expenseType)
      console.log('amount', amount)
      console.log('sumsByCategory', sumsByCategory)

      if (!sumsByCategory[expenseType]) {
        sumsByCategory[expenseType] = 0
      }

      sumsByCategory[expenseType] += amount
    })

    return Object.keys(sumsByCategory).map((expenseType) => ({
      name: expenseType,
      amount: sumsByCategory[expenseType],
      color: getRandomColor(),
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }))
  }

  const getRandomColor = () => {
    let letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
  const getMonthName = (selectedMonth: number) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    // Adjust for zero-based index (if necessary)
    const index = selectedMonth - 1 // Remove this line if selectedMonth is already zero-based
    if (index >= 0 && index < 12) {
      return monthNames[index]
    } else {
      return 'Error'
    }
  }
  const selectedMonthName = getMonthName(selectedMonth)
  const TotalPerMount = filteredSpendings.reduce(
    (total, spending) => total + Number(spending.amount),
    0
  )
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedMonthName}</Text>
      <Text>{TotalPerMount}</Text>

      <PieChart
        data={spendingData()}
        width={350}
        height={220}
        chartConfig={styles.chartConfig}
        accessor='amount'
        backgroundColor='transparent'
        paddingLeft='15'
        absolute
      />

      <Picker
        selectedValue={selectedMonth}
        onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}
        style={styles.picker}
      >
        {/* Generate Picker Items for Months */}
        <Picker.Item label='January' value={1} />
        <Picker.Item label='February' value={2} />
        <Picker.Item label='March' value={3} />
        <Picker.Item label='April' value={4} />
        <Picker.Item label='May' value={5} />
        <Picker.Item label='June' value={6} />
        <Picker.Item label='July' value={7} />
        <Picker.Item label='August' value={8} />
        <Picker.Item label='September' value={9} />
        <Picker.Item label='October' value={10} />
        <Picker.Item label='November' value={11} />
        <Picker.Item label='December' value={12} />

        {/* Add other months */}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: 300,
  },

  chartConfig: {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  },
  // ... other styles ...
})

export default Home
