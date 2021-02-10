import { useSelector } from 'react-redux'

import { IStory, IUser } from '../../common/models'

interface RootState {
  story: IStory
  user: IUser
}

// Story
export const useStoryDescription = () => useSelector((state: RootState) => state.story.description)
export const useStoryRevealed = () => useSelector((state: RootState) => state.story.revealed)
export const useStoryID = () => useSelector((state: RootState) => state.story.id)
export const useStoryReset = () => useSelector((state: RootState) => state.story.reset)
// User
export const useUserId = () => useSelector((state: RootState) => state.user.id)
export const useUserUserName = () => useSelector((state: RootState) => state.user.username)
