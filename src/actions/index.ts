//user
export const LOGIN = 'LOGIN'

export const login = data => {
  return {
    type: LOGIN,
    data
  }
}

//search
export const TOGGLE_SEARCH = 'TOGGLE_SEARCH'
export const GET_CHANNELS = 'GET_CHANNELS'
export const FINISH_SEARCH = 'FINISH_SEARCH'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'

export const toggleSearch = data => {
  return {
    type: TOGGLE_SEARCH,
    data
  }
}
export const getChannels = data => {
  return {
    type: GET_CHANNELS,
    data
  }
}
export const finishSearch = data => {
  return {
    type: FINISH_SEARCH,
    data
  }
}
export const clearSearch = data => {
  return {
    type: CLEAR_SEARCH,
    data
  }
}
//error
export const SHOW_ERROR = 'SHOW_ERROR'
export const HIDE_ERROR = 'HIDE_ERROR'

export const showError = data => {
  return {
    type: SHOW_ERROR,
    data
  }
}
export const hideError = data => {
  return {
    type: HIDE_ERROR,
    data
  }
}
//events
export const GET_ALL_EVENTS = 'GET_ALL_EVENTS'
export const GET_EVENTS = 'GET_EVENTS'
export const SHOW_ALL_EVENTS = 'SHOW_ALL_EVENTS'
export const ADD_RESULT_EVENTS = 'ADD_RESULT_EVENTS'

export const getAllEvents = data => {
  return {
    type: GET_ALL_EVENTS,
    data
  }
}
export const getEvents = data => {
  return {
    type: GET_EVENTS,
    data
  }
}
export const showAllEvents = data => {
  return {
    type: SHOW_ALL_EVENTS,
    data
  }
}
export const addResultEvents = data => {
  return {
    type: ADD_RESULT_EVENTS,
    data
  }
}
