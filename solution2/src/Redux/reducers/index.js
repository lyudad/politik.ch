import { combineReducers } from 'redux'
import councillors from './councillors'
import affairs from './affairs'

const rootReducer = combineReducers({
  councillors,
  affairs
})

export default rootReducer
