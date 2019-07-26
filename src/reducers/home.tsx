import { fromJS, List } from 'immutable'
import * as constants from '../constants/index.tsx'

const defaultState = fromJS({
  offsetNum: 0,
  events: [],
  eventHasMore: true,
  channels: [],
  selectChannels: [],
  isHome: true,
  isSearch: false
})

const addEventsList = (state, action) => {
  return state.merge({
    events: state.get('events').concat(action.events),
    offsetNum: action.offsetNum,
    eventHasMore: action.hasMore
  })
}

const fileterEventList = (state, action) => {
  console.log(action.events)
  return state.merge({
    events: List(action.events),
    eventHasMore: action.hasMore
  })
}

const setSearch = (state, action) => {
  return state.merge({
    isSearch: true
  })
}

const closeSearch = (state, action) => {
  return state.merge({
    isSearch: false
  })
}

const clearSearch = (state, action) => {
  return state.merge({
    events: List(action.events),
    eventHasMore: action.hasMore,
    selectChannels: List([])
  })
}

const setChannelList = (state, action) => {
  return state.merge({
    channels: action.channels
  })
}

const addFilterChannel = (state, action) => {
  return state.merge({
    selectChannels: state.get('selectChannels').concat(action.id)
  })
}

const deleteFilterChannel = (state, action) => {
  const channels = state.get('selectChannels').toJS()
  channels.splice(channels.indexOf(action.id), 1)

  return state.merge({
    // 数组转换成List()类型
    selectChannels: List(channels)
  })
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.ADD_EVENTS_LIST:
      return addEventsList(state, action)
    case constants.OPEN_SEARCH:
      return setSearch(state, action)
    case constants.CLOSE_SEARCH:
      return closeSearch(state, action)
    case constants.CLEAR_SEARCH:
      return clearSearch(state, action)
    case constants.CHANGE_CHANNEL_LIST:
      return setChannelList(state, action)
    case constants.ADD_FILTER_CHANNEL:
      return addFilterChannel(state, action)
    case constants.DELETE_FILTER_CHSNNEL:
      return deleteFilterChannel(state, action)
    case constants.FILTER_EVENTS_LIST:
      return fileterEventList(state, action)
    default:
      return state
  }
}
