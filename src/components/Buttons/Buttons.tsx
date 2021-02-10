import * as React from 'react'
import styled from 'styled-components'
import { Button } from '@bootstrap-styled/v4'
// Selectors
import { useStoryRevealed } from '../../store/selectors'
// Action dispatcher
import { useSetStoryReset, useSetStoryRevealed } from '../../store/dispatchers/story/storyDispatchers'

const ButtonsWrapper = styled.div`
  display: flex;
  padding: 1.5em 0;
`

const ButtonsItems = styled.div`
  flex: 0 1 auto;
  padding: 0 1em 0 0.25em;
`

const ButtonSubmit = styled(Button)`
  background: rgba(253, 119, 29, 1) !important;
  border-color: rgba(252, 176, 69, 1) !important;
  &: hover {
    background: rgba(252, 176, 69, 1) !important;
    border-color: rgba(253, 119, 29, 1) !important;
  }
`

const Buttons: React.FunctionComponent = () => {
  // Redux state
  const storyReaveled = useStoryRevealed()
  // Action dispatchers
  const storyReset = useSetStoryReset()
  const storyReveal = useSetStoryRevealed()

  return (
    <ButtonsWrapper>
      <ButtonsItems>
        <ButtonSubmit onClick={storyReveal}>Reveal Votes</ButtonSubmit>
      </ButtonsItems>
      <ButtonsItems>
        <Button color='secondary' onClick={storyReset} disabled={!storyReaveled}>
          Reset
        </Button>
      </ButtonsItems>
    </ButtonsWrapper>
  )
}

export default Buttons
