// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import client from './client'

const rootReducer = combineReducers({
  auth,
  client
})

export default rootReducer
