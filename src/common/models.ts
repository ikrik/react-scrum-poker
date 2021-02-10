// STORY
export interface IStory {
  id: string | undefined
  description: string
  revealed: boolean
  reset?: boolean
}

// USERS
export interface IUser {
  id: string | undefined
  username: string
  voted: boolean
}

export interface IUserList {
  users: IUser[]
}
