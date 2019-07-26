import axios from 'axios'
import * as constants from '../constants/index.tsx'
import baseURL from '../utils/api'

const token = sessionStorage.getItem('token')
const headers = {
  'X-BLACKCAT-TOKEN': token
}

const fetchEventDetail = id => {
  return axios.get(`${baseURL}/events/${id}`, {
    headers
  })
}

const fetchJoinUser = id => {
  return axios.get(`${baseURL}/events/${id}/participants`, {
    headers
  })
}

const fetchLikeUser = id => {
  return axios.get(`${baseURL}/events/${id}/likes`, {
    headers
  })
}

const fetchComment = id => {
  return axios.get(`${baseURL}/events/${id}/comments`, {
    headers
  })
}

const initEventData = (event, joinUsers, likeUsers, comments) => ({
  type: constants.INIT_EVENT_DATA,
  event,
  joinUsers,
  likeUsers,
  comments
})

export const getEventDetail = id => {
  return dispatch => {
    axios.all([fetchEventDetail(id), fetchJoinUser(id), fetchLikeUser(id), fetchComment(id)]).then(
      axios.spread((detail, join, like, comment) => {
        const event = detail.data.event
        const joinUsers = join.data.users
        const likeUsers = like.data.users
        const comments = comment.data.comments
        dispatch(initEventData(event, joinUsers, likeUsers, comments))
      })
    )
  }
}
