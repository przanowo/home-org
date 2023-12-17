import { Tabs } from 'expo-router'

const HomeLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{ headerTitle: 'Summary', title: 'Summary' }}
      />
      <Tabs.Screen
        name='spendings'
        options={{ headerTitle: 'Spendings', title: 'Spendings' }}
      />
      <Tabs.Screen
        name='shopping'
        options={{ headerTitle: 'Shopping', title: 'Shopping' }}
      />
      <Tabs.Screen
        name='todo'
        options={{ headerTitle: 'Todo', title: 'Todo' }}
      />
    </Tabs>
  )
}
export default HomeLayout
