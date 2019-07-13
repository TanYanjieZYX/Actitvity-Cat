import { CHANNELS_FETCHED } from '../constants'

const channels = (state = [], action = {}) => {
  switch (action.type) {
    case CHANNELS_FETCHED:
      return action.channels
    default:
      return state
  }
}

export default channels
