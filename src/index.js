import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import rootReducer from './reducers'
import routes from './routes'

// import setAuthorizationToken from './utils/setAuthorizationToken';
// import { setCurrentUser } from './actions/authActions';

import axios from 'axios'
import * as serviceWorker from './serviceWorker'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)))

// if (localStorage.Token) {
//   setAuthorizationToken(localStorage.jwtToken);

// }

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://localhost:8080/'
}

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes}>
      <div>{routes}</div>
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
