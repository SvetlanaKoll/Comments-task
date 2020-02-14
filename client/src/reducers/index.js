import { combineReducers } from 'redux'
import itemReducer from './itemReducer'
import modalStateReducer from './modalStateReducer'

export default combineReducers({
  item: itemReducer,
  modalState: modalStateReducer
})
