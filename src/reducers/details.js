import { INIT_EVENT_DATA }from '../constants';

const defaultState = {
  event: {},
  likeUsers: [],
  joinUsers: [],
  comments: []
}

const initEvent = (state, action) => {
  return {
    ...state,
    event: action.event,
    joinUsers:action.joinUsers,
    comments:action.comments,
    likeUsers:action.likeUsers
  }

}

export default (state = defaultState, action) => {
  switch (action.type) {
    case INIT_EVENT_DATA:
      return initEvent(state, action)
    default:
      return state
  }
}
