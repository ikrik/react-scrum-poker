import { handleActions, ReduxCompatibleReducer, Action } from 'redux-actions'

import { USER_CHANGE_USERNAME, USER_VOTED, USER_INIT, STORY_RESET } from '../../actions/actionsTypes'

import { IUser } from '../../../common/models'

// INIT empty USERS state object
export const InitialUsersState: IUser = {
  id: undefined,
  username: '',
  voted: false
}

const userReducer = handleActions<IUser, any>(
  {
    [USER_INIT]: (state: IUser, action: any) => ({
      ...state,
      id: action.init.id,
      username: action.init.username
    }),
    [USER_CHANGE_USERNAME]: (state: IUser, action: any) => ({
      ...state,
      username: action.username
    }),
    [USER_VOTED]: (state: IUser, action: any) => ({
      ...state,
      voted: true
    }),
    [STORY_RESET]: (state: IUser) => ({
      ...state,
      voted: false
    })
  },
  InitialUsersState
)

export default userReducer
