import * as React from 'react'
import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

import App from './App'

const GlobalStyle = createGlobalStyle`
  ${reset}
  thead, tbody, tfoot { vertical-align: middle }
  td, th, tr { vertical-align: inherit }
`

const EntryPoint: React.FunctionComponent = () => {
  return (
    <>
      <GlobalStyle />
      <App />
    </>
  )
}

export default EntryPoint
