import React from 'react'

import { Route, Switch } from 'react-router-dom'

import LoginPage from '../containers/Login/LoginPage'
import EventPage from '../containers/Events/EventPage'
import DetailPage from '../containers/Detail/DetailPage'
// import requireAuth from '../utils/requireAuth';

export default (
  <div className='container'>
    <Switch>
      <Route exact path='/' component={LoginPage} />
      <Route path='/event' component={EventPage} />
      <Route path='/detail/:id' component={DetailPage} />
    </Switch>
  </div>
)
