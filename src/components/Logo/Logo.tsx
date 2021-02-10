import * as React from 'react'
import { H3 } from '@bootstrap-styled/v4'
import styled from 'styled-components'

const LogoH3 = styled(H3)`
  padding: 0.35em 1em 0.25em 0;
  font-size: 2.5em;
`

const Logo: React.FunctionComponent = () => <LogoH3 color='muted'>Scrum Poker</LogoH3>

export default Logo
