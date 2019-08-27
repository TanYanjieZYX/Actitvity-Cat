import { combineReducers } from 'redux'
import error from '@reducer/error.ts'
import event from '@reducer/event.ts'
import search from '@reducer/search.ts'
import user from '@reducer/user.ts'

export default combineReducers({
  user,
  error,
  event,
  search
})
