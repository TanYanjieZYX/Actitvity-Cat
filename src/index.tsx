import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import logger from 'redux-logger'
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
import PrivateRoute from '@utils/privateRoute.tsx'
const setRem = () => {
  const html = document.getElementsByTagName('html')[0]
  const width = html.getBoundingClientRect().width
  const rem = width / 22.8
  html.style.fontSize = rem + 'px'
}

const sagaMiddleware = createSagaMiddleware()
//redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, logger)))

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://localhost:5005/'
}

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path='/' exact component={Login} />
          <PrivateRoute path='/main/' component={Main} />
          <PrivateRoute path='/event/:id' component={Detail} />
          <PrivateRoute path='/me/' component={Me} />
          <Route component={NotFound} />
        </Switch>
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
