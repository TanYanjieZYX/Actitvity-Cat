import { baseURL } from '@utils/api.ts'
// 登录
export const login = (username: string, password: string) =>
  fetch(`${baseURL}/auth/token`, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then(res => res.json())

// 获取所有频道
export const getChannels = (token: string) =>
  fetch(`${baseURL}/channels`, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'X-BLACKCAT-TOKEN': token
    }
  }).then(res => res.json())

// 获取所有活动列表
export const getAllEvents = (token: string, offset: number) =>
  fetch(`${baseURL}/events?offset=` + offset, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'X-BLACKCAT-TOKEN': token
    }
  }).then(res => res.json())

// 获取特定活动列表
export const getEvents = (token: string, params: string) =>
  fetch(`${baseURL}/events?` + params, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'X-BLACKCAT-TOKEN': token
    }
  }).then(res => res.json())

// 添加更多活动
export const addResultEvents = (token: string, params: string) =>
  fetch(`${baseURL}/events?` + params, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'X-BLACKCAT-TOKEN': token
    }
  }).then(res => res.json())

// 获取活动详情信息
export const getEvent = (token: string, id: number) =>
  fetch(`${baseURL}/events/` + id, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'X-BLACKCAT-TOKEN': token
    }
  }).then(res => res.json())

// 获取活动参与者
export const getParticipants = (token: string, id: number) =>
  fetch(`${baseURL}/events/` + id + '/participants', {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'X-BLACKCAT-TOKEN': token
    }
  }).then(res => res.json())

// 获取活动支持者
export const getLikes = (token: string, id: number) =>
  fetch(`${baseURL}/events/` + id + '/likes', {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'X-BLACKCAT-TOKEN': token
    }
  }).then(res => res.json())

// 获取活动评论
export const getComments = (token: string, id: number) =>
  fetch(`${baseURL}/events/` + id + '/comments', {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'X-BLACKCAT-TOKEN': token
    }
  }).then(res => res.json())

// 点赞活动
export const postLikes = (token: string, id: number) =>
  fetch(`${baseURL}/events/` + id + '/likes', {
    method: 'post',
    mode: 'cors',
    headers: {
      'X-BLACKCAT-TOKEN': token
    }
  })

// 取消点赞活动
export const deleteLikes = (token: string, id: number) =>
  fetch(`${baseURL}/events/` + id + '/likes', {
    method: 'delete',
    mode: 'cors',
    headers: {
      'X-BLACKCAT-TOKEN': token
    }
  })

// 参加活动
export const postGoing = (token: string, id: number) =>
  fetch(`${baseURL}/events/` + id + '/participants', {
    method: 'post',
    mode: 'cors',
    headers: {
      'X-BLACKCAT-TOKEN': token
    }
  })

// 取消参加活动
export const deleteGoing = (token: string, id: number) =>
  fetch(`${baseURL}/events/` + id + '/participants', {
    method: 'delete',
    mode: 'cors',
    headers: {
      'X-BLACKCAT-TOKEN': token
    }
  })

// 发送评论
export const postComment = (token: string, id: number, comment: string) =>
  fetch(`${baseURL}/events/` + id + '/comments', {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'X-BLACKCAT-TOKEN': token
    },
    body: JSON.stringify({
      comment
    })
  })

// 获取用户详细信息
export const getUser = (token: string) =>
  fetch(`${baseURL}/user`, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'X-BLACKCAT-TOKEN': token
    }
  }).then(res => res.json())

// 根据类型获取个人活动
export const getEventByType = (token: string, type: string) =>
  fetch(`${baseURL}/user/events?type=` + type, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'X-BLACKCAT-TOKEN': token
    }
  }).then(res => res.json())
