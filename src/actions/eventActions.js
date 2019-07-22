import axios from 'axios'
import * as constants from '../constants'
import baseURL from '../utils/api'

const token = sessionStorage.getItem('token')
const headers = {
  'X-BLACKCAT-TOKEN': token
}

export const changeEventsList = (events, hasMore, offsetNum) => ({
  type: constants.ADD_EVENTS_LIST,
  events,
  hasMore,
  offsetNum
})

export const filterEventsList = (events, hasMore) => ({
  type: constants.FILTER_EVENTS_LIST,
  events,
  hasMore
})

export const changeChannelList = channels => ({
  type: constants.CHANGE_CHANNEL_LIST,
  channels
})

export const clearSearchEvent = (events, hasMore) => ({
  type: constants.CLEAR_SEARCH,
  events,
  hasMore
})

export const getEventsList = (offsetNum = 0, selectChannels) => {
  return dispatch => {
    axios
      .get(`${baseURL}/events?offset=${offsetNum}&channels=${selectChannels.join()}`, {
        // todo 获取token
        headers
      })
      .then(res => {
        const { events, hasMore } = res.data
        dispatch(changeEventsList(events, hasMore, offsetNum + 25))
      })
  }
}

export const getEventsListByFilter = filterChannel => {
  return dispatch => {
    axios
      .get(`${baseURL}/events?channels=${filterChannel}`, {
        // todo 获取token
        headers
      })
      .then(res => {
        const { events, hasMore } = res.data
        dispatch(filterEventsList(events, hasMore))
      })
  }
}

export const getChannleList = () => {
  return dispatch => {
    axios
      .get(`${baseURL}/channels`, {
        headers
      })
      .then(res => {
        const { channels } = res.data
        dispatch(changeChannelList(channels))
      })
  }
}

export const clearSearch = () => {
  return dispatch => {
    axios
      .get(`${baseURL}/events`, {
        // todo 获取token
        headers
      })
      .then(res => {
        const { events, hasMore } = res.data
        dispatch(clearSearchEvent(events, hasMore))
      })
  }
}

export const openSearch = () => ({
  type: constants.OPEN_SEARCH
})

export const closeSearch = () => ({
  type: constants.CLOSE_SEARCH
})

export const addFilterChannel = id => ({
  type: constants.ADD_FILTER_CHANNEL,
  id
})

export const deleteFilterChannel = id => ({
  type: constants.DELETE_FILTER_CHSNNEL,
  id
})
