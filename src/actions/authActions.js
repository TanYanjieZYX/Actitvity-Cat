import axios from 'axios'
import * as constants from '../constants'
import baseURL from '../utils/api'

const changeLogin = (token, user) => ({
  type: constants.CHANGE_LOGIN,
  token,
  user
})

export const logout = () => {
  return dispatch => {
    sessionStorage.removeItem('token')
  }
}

export const login = (account, password) => {
  return dispatch => {
    axios
      .post(`${baseURL}/auth/token`, {
        username: account,
        password: password
      })
      .then(res => {
        const { token, user } = res.data
        dispatch(changeLogin(token, user))
        sessionStorage.setItem('token', token)
      })
  }
}
