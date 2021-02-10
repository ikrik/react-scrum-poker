import * as React from 'react'
import styled from 'styled-components'
// Selectors
import { useUserUserName } from '../../store/selectors'
// Data Hooks
import useUserNameData from './hooks/useUserNameData'

const NameInputWrapper = styled.div`
  padding: 0.5em 0;
  font-size: 40px;
  color: #545454;
  font-weight: bold;
`

const NameInput = styled.input`
  background: none;
  border: medium none;
  border-bottom: 2px dashed #c8c9cb;
  color: rgb(253, 119, 29);
  font-weight: bold;
  font-size: 40px;
  width: 400px;
  &:focus {
    outline: none;
    border: medium none;
    border-bottom: 2px dashed #c8c9cb;
  }
`

const UserName: React.FunctionComponent = () => {
  const name = React.useRef<HTMLInputElement>(null)
  // Redux state
  const userName = useUserUserName()
  // Data hook
  const { onUserNameChange } = useUserNameData()

  React.useEffect(() => {
    name?.current?.focus()
  }, [])

  return (
    <NameInputWrapper>
      Welcome <NameInput value={userName} onChange={onUserNameChange} ref={name} />
    </NameInputWrapper>
  )
}

export default UserName
