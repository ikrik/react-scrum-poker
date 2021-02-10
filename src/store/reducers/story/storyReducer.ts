import { handleActions, ReduxCompatibleReducer } from 'redux-actions'

import {
  STORY_DISABLE,
  STORY_ENABLE,
  STORY_INIT,
  STORY_RESET,
  STORY_REVEAL,
  STORY_UPDATE_DESCRIPTION,
  STORY_INIT_RESET_FLAG
} from '../../actions/actionsTypes'

import { IStory } from '../../../common/models'

// INIT empty STORY state object
export const InitialStoryState: IStory = {
  id: undefined,
  description: '',
  revealed: false,
  reset: false
}

const storyReducer: ReduxCompatibleReducer<IStory, any> = handleActions(
  {
    [STORY_UPDATE_DESCRIPTION]: (state: IStory, action: any) => ({
      ...state,
      description: action.description
    }),
    [STORY_INIT]: (state: IStory, action: any) => ({
      ...action.story
    }),
    [STORY_REVEAL]: (state: IStory) => ({
      ...state,
      revealed: true
    }),
    [STORY_RESET]: (state: IStory) => ({
      ...state,
      revealed: false,
      reset: true
    }),
    [STORY_INIT_RESET_FLAG]: (state: IStory) => ({
      ...state,
      reset: false
    })
  },
  InitialStoryState
)

export default storyReducer
