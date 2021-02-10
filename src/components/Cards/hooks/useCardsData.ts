import * as React from 'react'
// Database
import { firebase } from '../../../initFirebase'
// Selectors
import { useStoryReset, useStoryRevealed, useUserId } from '../../../store/selectors'

const db = firebase.database()

interface ICardsData {
  selectedNum: number | undefined
  onSelectCardChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const useCardsData: () => ICardsData = () => {
  // Inner state
  const [selectedNum, setSelectedNum] = React.useState<number | undefined>(undefined)
  // Redux state
  const userId = useUserId()
  const storyReaveled = useStoryRevealed()
  const storyReset = useStoryReset()

  React.useEffect(() => {
    if (storyReset) {
      setSelectedNum(undefined)
    }
  }, [storyReset])

  const handleSelectCard = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (storyReaveled || !event.target.value) {
      return
    }
    const card = Number(event.target.value)
    const voteRef = db.ref('votes')

    voteRef.once('value').then((snapshot) => {
      const values = snapshot.val()
      const findUser = values ? Object.keys(values).find((key) => values[key].user === userId) : undefined
      if (findUser) {
        db.ref(`votes/${findUser}/vote`).set(card)
      } else {
        const newVoteRef = voteRef.push()
        newVoteRef.set({ user: userId, vote: card })
      }
      db.ref(`users/${userId}/voted`).set(true)
      setSelectedNum(card)
    })
  }

  return {
    selectedNum,
    onSelectCardChange: handleSelectCard
  }
}

export default useCardsData
