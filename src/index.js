import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes/routes';

import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

import { Provider } from 'react-redux';

// import setAuthorizationToken from './utils/setAuthorizationToken';
// import { setCurrentUser } from './actions/authActions';

import axios from 'axios';
import * as serviceWorker from './serviceWorker';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
);

// if (localStorage.Token) {
//   setAuthorizationToken(localStorage.jwtToken);
  
// }

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://localhost:8080/';
}

ReactDOM.render(
  <Provider store={ store }>
    <Router routes={ routes } >
      <div>
        { routes }
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
