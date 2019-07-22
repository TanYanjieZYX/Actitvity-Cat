import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Home from '../containers/Home'
import Login from '../containers/Login'
import Detail from '../containers/Detail'
import UserInfo from '../containers/UserInfo'
// import requireAuth from '../utils/requireAuth';

export default (
  <div className='container'>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/detail/:id' component={Detail} />
      <Route path='/user' component={UserInfo} />
    </Switch>
  </div>
)
