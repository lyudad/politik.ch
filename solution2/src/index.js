import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './Components/App'

import { Provider } from 'react-redux'

import CreateStore from './Redux'

const { store } = CreateStore()
const rootElement = document.getElementById('root')

render(
  <Provider store={store}>
      <App />
  </Provider>,
  rootElement
)

