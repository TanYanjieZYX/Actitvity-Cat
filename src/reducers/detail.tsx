import { fromJS, List, Map } from 'immutable'
import * as constants from '../constants/index.tsx'

const defaultState = fromJS({
  event: {},
  likeUsers: [],
  joinUsers: [],
  comments: []
})

const initEvent = (state, action) => {
  return state.merge({
    event: Map(action.event),
    likeUsers: List(action.likeUsers),
    joinUsers: List(action.joinUsers),
    comments: List(action.comments)
  })
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.INIT_EVENT_DATA:
      return initEvent(state, action)
    default:
      return state
  }
}
