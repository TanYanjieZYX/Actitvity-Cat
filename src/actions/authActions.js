import axios from 'axios'
import { SET_CURRENT_USER } from '../constants'
import baseURL from '../utils/api'

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export const logout = () => {
  return dispatch => {
    sessionStorage.removeItem('Token')
  }
}

export const login = data => {
  return dispatch => {
    return axios.post(`${baseURL}/auth/token`, data).then(res => {
      const token = res.data.token
      sessionStorage.setItem('Token', token)
    })
  }
}
