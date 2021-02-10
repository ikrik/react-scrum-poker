import * as React from 'react'
// Database
import { firebase } from '../../../initFirebase'

import { useStoryReset, useStoryRevealed } from '../../../store/selectors'

export interface UserItem {
  id: string
  voted: boolean
  name: string
  revealedCard: string
  card: number
}

interface IUserData {
  users: UserItem[]
}

const db = firebase.database()

const useUsersData: () => IUserData = () => {
  const [users, setUsers] = React.useState<UserItem[]>([])

  const storyReset = useStoryReset()
  const storyReaveled = useStoryRevealed()

  React.useEffect(() => {
    const usersRef = db.ref('users')

    usersRef.on('value', (snapshot) => {
      const users = snapshot.val()
      if (users) {
        setUsers(
          Object.keys(users)
            .map((key) => ({
              id: key,
              voted: users[key].voted ?? false,
              name: users[key].username,
              revealedCard: '-',
              card: 0
            }))
            .sort((a: UserItem, b: UserItem) => (a.name > b.name ? 1 : -1))
        )
      }
    })

    return () => usersRef.off()
  }, [])

  React.useEffect(() => {
    if (storyReaveled) {
      const votesRef = db.ref('votes')

      votesRef.once('value').then((snapshot) => {
        const values = snapshot.val()
        setUsers(
          users
            .map((user: UserItem) => {
              const votedCard = values ? Object.keys(values).find((key) => user.id === values[key].user) : undefined
              const revealedCard = votedCard && values[votedCard].vote !== 0 ? values[votedCard].vote.toString() : '-'
              return {
                ...user,
                card: votedCard ? values[votedCard].vote : 0,
                revealedCard,
                voted: !!votedCard
              }
            })
            .sort((a: UserItem, b: UserItem) => (a.card === b.card ? (a.name > b.name ? -1 : 1) : a.card > b.card ? -1 : 1))
        )
      })
    }
    if (storyReset) {
      db.ref('votes').remove()
      const usersRef = db.ref('users')
      usersRef.once('value').then((snapshot) => {
        const updates: any = {}
        snapshot.forEach((userSnapshot) => {
          updates[`${userSnapshot.key}/voted`] = false
        })
        usersRef.update(updates)
      })
    }
  }, [storyReaveled, storyReset])

  return {
    users
  }
}

export default useUsersData
