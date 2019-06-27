import { combineReducers } from 'redux'

import auth from './auth';
import events from './events';
import channels from './channels';
import details from './details';

export default combineReducers({
  auth,
  events,
  channels,
  details
});