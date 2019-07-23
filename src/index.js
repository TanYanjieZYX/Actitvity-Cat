import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import rootReducer from './reducers'
import routes from './routes'

// import setAuthorizationToken from './utils/setAuthorizationToken';
// import { setCurrentUser } from './actions/authActions';

import axios from 'axios'
import * as serviceWorker from './serviceWorker'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import '../src/scss/index.scss'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// if (localStorage.Token) {
//   setAuthorizationToken(localStorage.jwtToken);

// }

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://localhost:8080/'
}

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router routes={routes}>
        <div>{routes}</div>
      </Router>
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
