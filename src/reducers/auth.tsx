import { fromJS } from 'immutable'
import * as constants from '../constants/index.tsx'

const defaultState = fromJS({
  loginStatus: false,
  token: '',
  user: {}
})

const changeLogin = (state, action) => {
  return state.merge({
    user: action.user,
    token: action.token,
    loginStatus: true
  })
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_LOGIN:
      return changeLogin(state, action)
    default:
      return state
  }
}
