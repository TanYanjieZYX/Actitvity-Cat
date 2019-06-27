import baseURL from '../utils/api';
import axios from 'axios';
import { INIT_EVENT_DATA }from '../constants';

const fetchEvent = (id) => {
  return axios.get(`${baseURL}/events/${id}`,{
      headers: {
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    }) 
};
const fetchUsers = (id) => {
  return axios.get(`${baseURL}/events/${id}/participants`,{
      headers: {
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    })     
};
const fetchComments = (id) => {
  return axios.get( `${baseURL}/events/${id}/comments`,{
      headers: {
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    }) 
};
const fetchLikes = (id) => {
  return axios.get( `${baseURL}/events/${id}/likes`,{
      headers: {
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    })
};

const initEventData = (event, joinUsers, comments, likeUsers) => ({
  type: INIT_EVENT_DATA,
  event,
  joinUsers,
  comments,
  likeUsers
})

export const getEventDetail = id => {
  return dispatch => {
    axios
      .all([
        fetchEvent(id),
        fetchUsers(id),
        fetchComments(id),
        fetchLikes(id)
      ])
      .then(
        axios.spread((detail, join, comment, like) => {
          const event = detail.data.event
          const joinUsers = join.data.users
          const comments = comment.data.comments
          const likeUsers = like.data.users         
          dispatch(initEventData(event, joinUsers, comments, likeUsers))
        })
      )
  }
}



