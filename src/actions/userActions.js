import { USER_FETCHED, USEREVENTS_FETCHED } from '../constants'
import baseURL from '../utils/api'

export const userFetched = user => {
  return {
    type: USER_FETCHED,
    user
  }
}

//得到某个用户的信息
export const fetchUser = () => {
  return dispatch => {
    fetch(`${baseURL}/user`, {
      headers: {
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    })
      .then(res => res.json())
      .then(data => dispatch(userFetched(data.user)))
  }
}

export const usereventsFetched = userevents => {
  return {
    type: USEREVENTS_FETCHED,
    userevents
  }
}

//得到某个用户的信息
export const fetchUserEvents = () => {
  return dispatch => {
    fetch(`${baseURL}/user/events`, {
      headers: {
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    })
      .then(res => res.json())
      .then(data => dispatch(usereventsFetched(data.userevents)))
  }
}
