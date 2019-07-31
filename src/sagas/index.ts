import { all, call, put, takeLatest, delay } from 'redux-saga/effects'
import { addResultEvents, getAllEvents, getChannels, getEvents, login } from '@api/index.ts'
import { setCookie } from '@utils/setCookie.ts'

function* loginAsync(action: { username: string; password: string; type: string; history: any }) {
  const json = yield call(login, action.username, action.password)
  if (!!json.error) {
    yield put({ type: 'SHOW_ERROR', error: json.error })
    yield call(delay, 2000)
    yield put({ type: 'HIDE_ERROR' })
  } else {
    yield put({ type: 'LOGIN', data: json })
    setCookie('USER_TOKEN', json.token)
    action.history.push('/main')
  }
}

function* getAllEventsAsync(action: { type: string; token: string; offset: number }) {
  const json = yield call(getAllEvents, action.token, action.offset)
  yield put({ type: 'GET_ALL_EVENTS', events: json.events, hasMore: json.hasMore })
  yield put({ type: 'CLEAR_SEARCH' })
}

function* getEventsAsync(action: { type: string; token: string; params: string; text: string }) {
  const json = yield call(getEvents, action.token, action.params)
  yield put({ type: 'GET_EVENTS', events: json.events, hasMore: json.hasMore })
  yield put({ type: 'FINISH_SEARCH', text: action.text, params: action.params })
}

function* addResultEventsAsync(action: { type: string; token: string; params: string }) {
  const json = yield call(addResultEvents, action.token, action.params)
  yield put({ type: 'ADD_RESULT_EVENTS', events: json.events, hasMore: json.hasMore })
}

function* getChannelsAsync(action: { type: string; token: string }) {
  const json = yield call(getChannels, action.token)
  yield put({ type: 'GET_CHANNELS', channels: json.channels })
}

export default function* rootSaga() {
  yield all([
    takeLatest('LOGIN_ASYNC', loginAsync),
    takeLatest('GET_ALL_EVENTS_ASYNC', getAllEventsAsync),
    takeLatest('GET_CHANNELS_ASYNC', getChannelsAsync),
    takeLatest('GET_EVENTS_ASYNC', getEventsAsync),
    takeLatest('ADD_RESULT_EVENTS_ASYNC', addResultEventsAsync)
  ])
}
