import { createStore, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'
import apiMiddlware from './middlewares/api'

import rootReducer from './reducers'

export default () => {

  const middlewares = [apiMiddlware, thunk]


  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const enhancer = composeEnhancers(applyMiddleware(...middlewares))

  const store = createStore(rootReducer, enhancer)

  return { store }
}
