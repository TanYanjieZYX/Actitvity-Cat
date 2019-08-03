import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Redirect, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

import axios from 'axios'
import * as serviceWorker from './serviceWorker.ts'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n.ts'
import rootReducer from '@reducer/index.ts'
import rootSaga from '@sagas/index.ts'
import './scss/index.scss'

import Login from '@container/Login/index.tsx'
import Main from '@container/Main/index.tsx'
import Detail from '@container/Detail/index.tsx'
import Me from '@container/Me/index.tsx'
import NotFound from '@container/Error/index.tsx'
const setRem = () => {
  const html = document.getElementsByTagName('html')[0]
  const width = html.getBoundingClientRect().width
  const rem = width / 22.8
  html.style.fontSize = rem + 'px'
}

const sagaMiddleware = createSagaMiddleware()
//redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
const PrivateRoute = (props: any) => {
  if (window.location.pathname === '/') {
    return <Route />
  }
  // store中没有token信息,则重定向到首页
  if (!!store.getState().user.token) {
    return <Route path={props.path} component={props.component} />
  } else {
    return <Redirect to={{ pathname: '/' }} />
  }
}

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://localhost:8080/'
}

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router history={createBrowserHistory()}>
        <div>
          <Route path='/' exact={true} component={Login} />
          <Route path='/main/' component={Main} />
          <Route path='/event/:id' component={Detail} />
          <Route path='/me/' component={Me} />
          <Route path='*' component={NotFound}></Route>
        </div>
      </Router>
    </Provider>
  </I18nextProvider>,
  document.getElementById('root') as HTMLElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
sagaMiddleware.run(rootSaga)
serviceWorker.unregister()
setRem()
window.addEventListener('resize', setRem)
