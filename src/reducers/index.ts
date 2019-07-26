import { combineReducers } from 'redux'
import error from './error.ts'
import event from './event.ts'
import search from './search.ts'
import user from './user.ts'

export default combineReducers({
  user,
  error,
  event,
  search
})
