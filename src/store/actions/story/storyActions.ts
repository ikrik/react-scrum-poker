import { IStory } from '../../../common/models'
import * as actions from '../actionsTypes'

export const storyInit = (story: IStory) => ({
  type: actions.STORY_INIT,
  story
})

export const storyDescriptionUpdate = (description: string) => ({
  type: actions.STORY_UPDATE_DESCRIPTION,
  description
})

export const storyRevealed = () => ({
  type: actions.STORY_REVEAL
})

export const storyReset = () => ({
  type: actions.STORY_RESET
})

export const storyInitResetFlag = () => ({
  type: actions.STORY_INIT_RESET_FLAG
})
