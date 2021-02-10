import { useDispatch } from 'react-redux'
import { userChangeName, userVoted, userInit, UserInit } from '../../actions/user/userActions'

export const useSetInitUser = () => {
  const dispatch = useDispatch()
  // console.log('[name dispatcher]', name)
  return (payload: UserInit) => {
    dispatch(userInit(payload))
  }
}

export const useSetUserChangeName = () => {
  const dispatch = useDispatch()
  // console.log('[name dispatcher]', name)
  return (payload: string) => {
    console.log('payload', payload)
    dispatch(userChangeName(payload))
  }
}

export const useSetUserVoted = () => {
  const dispatch = useDispatch()

  return (payload: number) => {
    dispatch(userVoted(payload))
  }
}
