import { combineReducers } from 'redux-immutable'

import home from './home.tsx'
import auth from './auth.tsx'
import detail from './detail.tsx'

export default combineReducers({
  home,
  auth,
  detail
})
