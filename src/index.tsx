import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import EntryPoint from './EntryPoint'

const Root: React.FunctionComponent = () => (
  <Provider store={store}>
    <EntryPoint />
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement)
