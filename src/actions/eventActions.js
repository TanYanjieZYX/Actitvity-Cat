import { EVENTS_FETCHED, EVENT_FETCHED, 
           USERS_FETCHED, USER_UPDATED, USER_DELETED, 
              COMMENTS_FETCHED, COMMENT_ADDED,
                 LIKES_FETCHED, LIKE_UPDATED, LIKE_DELETED } from '../constants';
import baseURL from '../utils/api';
import { mergeQueryInUrl } from '../utils/mergeQueryInUrl';

export const eventsFetched = (events) => {
  return {
    type: EVENTS_FETCHED,
    events
  }
};

export const eventFetched = (event) => {
  return {
    type: EVENT_FETCHED,
    event
  }
};

//得到整个事件列表 event_tab
export const fetchEvents = (query={}) => {
  let old_url = `${baseURL}/events`;
  let new_url = mergeQueryInUrl(old_url,query);
  console.log(old_url);
  console.log(new_url);
  return dispatch => {
    fetch(new_url,{
      headers: {
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    })
      .then(res => res.json())
      .then(data => dispatch(eventsFetched(data.events)))
  }
};

//点击某个事件详情 event_tab
export const fetchEvent = (id) => {
  return dispatch => {
    fetch(`${baseURL}/events/${id}`,{
      headers: {
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    })
      .then(res => res.json())
      .then(data => dispatch(eventFetched(data.event)))
  }
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response
    throw error;
  }
}


export const usersFetched = (users) => {
  return {
    type: USERS_FETCHED,
    users
  }
};

export const userUpdated = (user) => {
  return {
    type: USER_UPDATED,
    user
  }
};

export const userDeleted = (userID) => {
  return {
    type: USER_DELETED,
    userID
  }
};

//得到某个事件的所有参与者信息 participation_tab
export const fetchUsers = (id) => {
  return dispatch => {
    fetch(`${baseURL}/events/${id}/participants`,{
      headers: {
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    })
      .then(res => res.json())
      .then(data => dispatch(usersFetched(data.users)))
  }
};
//设置-更新某个事件的登陆者信息 participation_tab
export const updateUser = (data) => {
  return dispatch => {
    return fetch(`${baseURL}/events/${data.eid}/participants`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    }).then(handleResponse)
      .then(data => dispatch(userUpdated(data.user)));
  }
};

//不参与某个event participation_tab
export const deleteUser = (id) => {
  return dispatch => {
    return fetch(`${baseURL}/events/${id}/participants`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    }).then(handleResponse)
      .then(data => dispatch(userDeleted(id)));
  }
};

export const commentsFetched = (comments) => {
  return {
    type: COMMENTS_FETCHED,
    comments
  }
};

export const commentAdded = (comment) => {
  return {
    type: COMMENT_ADDED,
    comment
  }
};
//获取一个event下面的所有comments comment_tab
export const fetchComments = (id) => {
  return dispatch => {
    fetch( `${baseURL}/events/${id}/comments`,{
      headers: {
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    })
      .then(res => res.json())
      .then(data => dispatch(commentsFetched(data.comments)))
  }
};

//增加评论 comment_tab
export const addComment = (data) => {
  return dispatch => {
    return fetch(`${baseURL}/events/{data.event_id}/comments`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    }).then(handleResponse)
      .then(data => dispatch(commentAdded(data.comment)));
  }
};

export const likesFetched = (users) => {
  return {
    type: LIKES_FETCHED,
    users
  }
};

export const likeUpdated = (like) => {
  return {
    type: LIKE_UPDATED,
    like
  }
};

export const likeDeleted = (like) => {
  return {
    type: LIKE_DELETED,
    like
  }
};
//查询event下like的人 like_tab
export const fetchLikes = (id) => {
  return dispatch => {
    fetch( `${baseURL}/events/${id}/likes`,{
      headers: {
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    })
      .then(res => res.json())
      .then(data => dispatch(likesFetched(data.users)))
  }
};

//设置-更新某个事件的登陆者信息 like_tab
export const updateLike = (data) => {
  return dispatch => {
    return fetch(`${baseURL}/events/${data.eid}/likes`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    }).then(handleResponse)
      .then(data => dispatch(likeUpdated(data.like)));
  }
};

//不参与某个event like_tab
export const deleteLike = (id) => {
  return dispatch => {
    return fetch(`${baseURL}/events/${id}/likes`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
        'x-blackcat-token': sessionStorage.getItem('Token')
      }
    }).then(handleResponse)
      .then(data => dispatch(likeDeleted(id)));
  }
};


