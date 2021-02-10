import * as React from 'react'
import { Table, Thead, Tr, Th, Tbody, Td } from '@bootstrap-styled/v4'
import styled from 'styled-components'
// Selectors
import { useStoryRevealed } from '../../store/selectors'
// Data Hooks
import useUsersData, { UserItem } from './hooks/useUsersData'

const StoryTable = styled(Table)`
  background: #fff !important;
`

const Users: React.FunctionComponent = () => {
  // Redux state
  const storyReaveled = useStoryRevealed()
  // Data hook
  const { users } = useUsersData()

  return (
    <StoryTable hover>
      <Thead>
        <Tr color='active'>
          <Th>Username</Th>
          <Th>Vote</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.length > 0
          ? users.map((res: UserItem, index: number) => (
              <Tr scope='row' key={`_${res.id}${index}`}>
                <Td>{res.name}</Td>
                <Td>{storyReaveled ? res.revealedCard : res.voted ? 'Voted!' : 'Waiting for vote'}</Td>
              </Tr>
            ))
          : null}
      </Tbody>
    </StoryTable>
  )
}

export default Users
