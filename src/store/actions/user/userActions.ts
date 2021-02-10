import { USER_CHANGE_USERNAME, USER_INIT, USER_VOTED } from '../actionsTypes'

export interface UserInit {
  id: string | null
  username: string
}

export const userInit = ({ username, id }: UserInit) => ({
  type: USER_INIT,
  init: { username, id }
})

export const userChangeName = (username: string) => ({
  type: USER_CHANGE_USERNAME,
  username
})

export const userVoted = (card: number) => ({
  type: USER_VOTED,
  card
})
