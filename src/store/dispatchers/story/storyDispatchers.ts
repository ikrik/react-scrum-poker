import { useDispatch } from 'react-redux'
import { storyInit, storyDescriptionUpdate, storyRevealed, storyReset, storyInitResetFlag } from '../../actions/story/storyActions'
import { IStory } from './../../../common/models'

// Dispatch Init Story
export const useSetStoryInit = () => {
  const dispatch = useDispatch()

  return (payload: IStory) => {
    dispatch(storyInit(payload))
  }
}

// Dispatch Change Story Description
export const useSetStoryDescription = () => {
  const dispatch = useDispatch()

  return (payload: string) => {
    dispatch(storyDescriptionUpdate(payload))
  }
}

// Dispatch Story Revealing
export const useSetStoryRevealed = () => {
  const dispatch = useDispatch()

  return () => {
    dispatch(storyRevealed())
  }
}

// Dispatch Story Resetting
export const useSetStoryReset = () => {
  const dispatch = useDispatch()

  return () => {
    dispatch(storyReset())
  }
}

// Dispatch Story Init Reset Flag
export const useSetStoryInitResetFlag = () => {
  const dispatch = useDispatch()

  return () => {
    dispatch(storyInitResetFlag())
  }
}
