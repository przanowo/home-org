import { FIREBASE_AUTH } from '../../firebaseConfig'
import { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'

const useFetchHomeId = () => {
  const user = FIREBASE_AUTH.currentUser
  const [homeId, setHomeId] = useState<string>('')

  useEffect(() => {
    if (user) {
      const fetchHomeId = async () => {
        const homesRef = collection(FIREBASE_DB, 'homes')
        const q = query(homesRef, where('ownerEmail', '==', user.email))
        const querySnapshot = await getDocs(q)
        const homeData = querySnapshot.docs[0] // Assuming one home per user

        if (homeData) {
          setHomeId(homeData.id)
        } else {
          console.log('No home found for user')
        }
      }

      fetchHomeId()
    }
  }, [user])

  return homeId
}

export default useFetchHomeId
