import { combineReducers } from 'redux-immutable'

import home from './home'
import auth from './auth'
import detail from './detail'

export default combineReducers({
  home,
  auth,
  detail
})
