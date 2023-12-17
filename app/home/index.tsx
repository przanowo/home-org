import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import { spendings } from '../../data/spendings' // Update the path as necessary
import { Picker } from '@react-native-picker/picker'

interface SpendingItem {
  id: number
  description: string
  category: string
  date: string
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

  useEffect(() => {
    filterSpendingsByMonth()
  }, [selectedMonth])

  const filterSpendingsByMonth = (): void => {
    const filtered: SpendingItem[] = spendings.filter((spending) => {
      const month = new Date(spending.date).getMonth() + 1
      return month === selectedMonth
    })
    setFilteredSpendings(filtered)
  }

  // const spendingData = () => {
  //   // Aggregate spending data by category for the selected month
  //   // Example implementation, you may need to adjust it as per your requirements
  //   // Return data in a format suitable for PieChart
  // }

  const spendingData = (): PieChartData[] => {
    const sumsByCategory: { [key: string]: number } = {}

    filteredSpendings.forEach((spending) => {
      const category = spending.category
      const amount = spending.amount

      if (!sumsByCategory[category]) {
        sumsByCategory[category] = 0
      }

      sumsByCategory[category] += amount
    })

    return Object.keys(sumsByCategory).map((category) => ({
      name: category,
      amount: sumsByCategory[category],
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

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

      {/* Additional UI elements to display spending details */}
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
