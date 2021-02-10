import * as React from 'react'
// Database
import { firebase } from '../../../initFirebase'
// Common functions/hooks
import generateDefaultName from '../../../common/utils/generateCustomName'
import useStorage from '../../../common/hooks/useStorage'
// Action Dispatcher
import { useSetInitUser, useSetUserChangeName } from '../../../store/dispatchers/user/userDispatchers'

const db = firebase.database()

interface IUserNameData {
  onUserNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const useUserNameData: () => IUserNameData = () => {
  // Dispatch action hooks
  const userNameUpdater = useSetUserChangeName()
  const userInit = useSetInitUser()
  // LocalStorage hook
  const localStorage = useStorage({ key: 'userId', initialValue: null })

  // On-init Load
  React.useEffect(() => {
    const usersRef = db.ref('users')

    usersRef.once('value').then((snapshot) => {
      const activeUsers = snapshot.val()
      const getLocalStorageUser = localStorage.storedValue
      const userFound = activeUsers ? Object.keys(activeUsers).find((key) => key === getLocalStorageUser) : undefined
      console.log('[activeUsers]:', activeUsers)

      if (!userFound) {
        const initUsername = generateDefaultName()
        const initUser = {
          username: initUsername,
          voted: false
        }
        const newUserRef = usersRef.push()
        newUserRef.set(initUser)
        userInit({ id: newUserRef.key, username: initUsername })
        localStorage.setValue(newUserRef.key)
      } else {
        const registeredName = activeUsers[userFound].username
        // Same username for more than 2 users
        if (Object.keys(activeUsers).filter((key) => activeUsers[key].username === registeredName).length > 1) {
          const newName = generateDefaultName()
          userInit({ id: userFound, username: newName })
          db.ref(`users/${userFound}/username`).set(newName)
        } else {
          userInit({ id: userFound, username: registeredName })
        }
      }
    })
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    userNameUpdater(event.target.value)
    db.ref(`users/${localStorage.storedValue}/username`).set(event.target.value)
  }

  return {
    onUserNameChange: handleChange
  }
}

export default useUserNameData
