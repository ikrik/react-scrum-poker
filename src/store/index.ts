import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import window from 'global/window'

import reducers from './reducers/reducers'

// using enhancers
const initialState = {}
const middlewares = [thunkMiddleware]
const enhancers = [applyMiddleware(...middlewares)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(reducers, initialState, composeEnhancers(...enhancers))
