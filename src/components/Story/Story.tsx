import * as React from 'react'
import styled from 'styled-components'
import { Textarea } from '@bootstrap-styled/v4'
// Selectors
import { useStoryDescription, useStoryRevealed } from '../../store/selectors'
// Data Hooks
import useStoryData from './hooks/useStoryData'

const DescriptionLabel = styled.h3`
  font-size: 24px;
  color: rgb(99 108 114);
  padding-bottom: 0.25em;
`
const StoryTextArea = styled(Textarea)`
  padding: 1em;
  font-size: 18px;
  color: #545454;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  min-height: 100px;
  width: calc(100% - 2em) !important;
`

const Story: React.FunctionComponent = () => {
  // Redux state
  const storyDescription = useStoryDescription()
  const storyRevealed = useStoryRevealed()
  // Data hook
  const { onTextAreaChange } = useStoryData()

  return (
    <>
      <DescriptionLabel>Story Description</DescriptionLabel>
      <StoryTextArea
        disabled={storyRevealed}
        placeholder='Describe your story'
        onChange={onTextAreaChange}
        value={storyDescription}
        name='text'
      />
    </>
  )
}

export default Story
