import { CHANNELS_FETCHED } from '../constants';
import baseURL from '../utils/api';

export const channelsFetched = (channels) => {
  return {
    type: CHANNELS_FETCHED,
    channels
  }
};

//得到整个channels
export const fetchChannels = () => {
  return dispatch => {
    fetch(`${baseURL}/channels`,{
      headers: {
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    })
      .then(res => res.json())
      .then(data => dispatch(channelsFetched(data.channels)))
  }
};