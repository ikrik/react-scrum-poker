import { combineReducers } from 'redux'

import storyReducer from './story/storyReducer'
import userReducer from './user/userReducer'

const reducers = combineReducers({
  story: storyReducer,
  user: userReducer
})

export default reducers
