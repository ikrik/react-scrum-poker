import * as React from 'react'
// Database
import { firebase } from '../../../initFirebase'
// Selectors
import { useStoryID, useStoryDescription, useStoryRevealed, useStoryReset } from '../../../store/selectors'
// Action dispatchers
import {
  useSetStoryDescription,
  useSetStoryInit,
  useSetStoryInitResetFlag,
  useSetStoryReset,
  useSetStoryRevealed
} from '../../../store/dispatchers/story/storyDispatchers'

interface IStoryData {
  onTextAreaChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface InitStory {
  description: string
  revealed: boolean
  active: boolean
}

const db = firebase.database()

const initStory: InitStory = {
  description: '',
  revealed: false,
  active: true
}

const useStoryData: () => IStoryData = () => {
  // Inner State
  const [anotherUserTrigger, setAnotherUserTrigger] = React.useState<boolean>(false)
  const [fetchedData, setFetchedData] = React.useState<InitStory | undefined>(undefined)

  // Redux State
  const storyDescription = useStoryDescription()
  const storyID = useStoryID()
  const storyRevealed = useStoryRevealed()
  const storyReset = useStoryReset()

  // Action Dispatcher
  const storyInit = useSetStoryInit()
  const updateStoryRevealed = useSetStoryRevealed()
  const updateStoryDescription = useSetStoryDescription()
  const updateStoryReset = useSetStoryReset()
  const initResetFlag = useSetStoryInitResetFlag()

  // On-init Load
  React.useEffect(() => {
    const storyRef = db.ref('stories')

    storyRef.once('value').then((snapshot) => {
      const values = snapshot.val()

      const activeStory = values ? Object.keys(values).find((key) => values[key].active) : undefined
      if (!activeStory) {
        const newStoryRef = storyRef.push()
        newStoryRef.set(initStory)
        storyInit({
          ...initStory,
          id: newStoryRef.key ?? undefined
        })
      } else {
        storyInit({
          ...values[activeStory],
          id: activeStory
        })
      }
    })

    return () => storyRef.off()
  }, [])

  // On-fetchedData Change
  React.useEffect(() => {
    if (fetchedData) {
      // Not same descriptions - changed by other user
      if (fetchedData.description !== storyDescription) {
        updateStoryDescription(fetchedData.description)
      }
      // Revealed button pressed by another user
      if (fetchedData.revealed && !storyRevealed && !storyReset) {
        setAnotherUserTrigger(true)
        updateStoryRevealed()
      }
      // Reset button pressed by us
      if (fetchedData.revealed && !storyRevealed && storyReset) {
        db.ref(`stories/${storyID}/description`).set(initStory.description)
        db.ref(`stories/${storyID}/revealed`).set(initStory.revealed)
      }
      // Reset button pressed by another user
      if (!fetchedData.revealed && storyRevealed && !storyReset) {
        updateStoryReset()
      }
    }
  }, [fetchedData])

  // On-storyId Change
  React.useEffect(() => {
    let storyRef: firebase.database.Reference
    if (storyID) {
      storyRef = db.ref('stories')

      storyRef.on('child_changed', (snapshot) => {
        const response = snapshot.val()
        console.log('[response]', response)
        setFetchedData(response)
      })
    }
    return () => storyRef?.off()
  }, [storyID])

  // On-storyRevealed Change
  React.useEffect(() => {
    if (storyID && storyRevealed && !storyReset && !anotherUserTrigger) {
      db.ref(`stories/${storyID}/revealed`).set(true)
      // This is true only when the reveal button is pressed
    }
  }, [storyRevealed])

  // On-storyReset Change
  React.useEffect(() => {
    if (storyReset) {
      db.ref(`stories/${storyID}/description`).set(initStory.description)
      db.ref(`stories/${storyID}/revealed`).set(initStory.revealed)
      setTimeout(() => {
        initResetFlag()
        setAnotherUserTrigger(false)
        setFetchedData(undefined)
      }, 5000)
    }
  }, [storyReset])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateStoryDescription(event.target.value)
    db.ref(`stories/${storyID}/description`).set(event.target.value)
  }

  return {
    onTextAreaChange: handleChange
  }
}

export default useStoryData
