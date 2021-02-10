import * as React from 'react'
import { Card, CardBlock } from '@bootstrap-styled/v4'
import styled from 'styled-components'
// Common utils
import fibonnaciSique from '../../common/utils/fibonnaciSiquel'
// Selectors
import { useStoryRevealed } from '../../store/selectors'
// Data Hooks
import useCardsData from './hooks/useCardsData'

const CardsHeader = styled.h3`
  font-size: 28px;
  font-weight: bold;
  color: rgb(84 84 84);
  padding: 0.25em 0 0.25em 0.75em;
  flex: 1 1 100%;
  max-height: 50px;
  letter-spacing: -1.3px;
`

const CardsWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  width: 100%;
  height: 100%;
`

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const FiboNumbers = styled.h3`
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  align-self: center;
`
const CardInputElement = styled.input`
  display: none;
  &:checked + Card {
    box-shadow: 0 0 1px 1px #2ecc71;
  }
`
const FiboCard = styled(Card)<{ selected: boolean }>`
  box-shadow: ${(props) => (props.selected ? '0 0 1px 1px rgb(253, 119, 29)' : 'none')};
  color: ${(props) => (props.selected ? 'rgb(253, 119, 29)' : '#545454')};
  height: 100%;
  &:hover {
    cursor: pointer;
    background: rgb(253, 119, 29);
    background: linear-gradient(0deg, rgba(253, 119, 29, 1) 0%, rgba(252, 176, 69, 1) 100%);
    color: #fff;
    box-shadow: 0 0 5px 1px rgb(0, 0, 0, 0.16);
  }
`
const FiboCardBlock = styled(CardBlock)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Label = styled.label`
  padding: .25em;
  flex: 0 1 auto;
}
`
const Cards: React.FunctionComponent = () => {
  // Redux state
  const storyReaveled = useStoryRevealed()
  // Data hook
  const { selectedNum, onSelectCardChange } = useCardsData()
  // Common Util
  const fibonnaci: number[] = React.useMemo(() => fibonnaciSique(34), [])

  return (
    <CardsWrapper>
      <CardsHeader>Select your Poker Card...</CardsHeader>
      <CardsContainer>
        {fibonnaci.map((res) => (
          <Label key={`_${res}_`}>
            <CardInputElement disabled={storyReaveled} type='radio' value={res} name='fiboNum' onChange={(e) => onSelectCardChange(e)} />
            <FiboCard selected={res === selectedNum}>
              <FiboCardBlock>
                <FiboNumbers>{res}</FiboNumbers>
              </FiboCardBlock>
            </FiboCard>
          </Label>
        ))}
      </CardsContainer>
    </CardsWrapper>
  )
}

export default Cards
