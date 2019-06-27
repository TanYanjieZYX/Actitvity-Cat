import { EVENTS_FETCHED } from '../constants';

const events = (state = [], action = {}) => {
  switch(action.type) {
    case EVENTS_FETCHED:
      return action.events;
    default: return state;
  }
}

export default events;