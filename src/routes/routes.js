import React from 'react';

import { Route,Switch } from 'react-router-dom';

import LoginPage from '../components/login/LoginPage';
import EventPage from '../components/events/EventPage';
import DetailPage from '../components/details/DetailPage';
// import requireAuth from '../utils/requireAuth';


export default (
  
    <div className="container">
    <Switch>
      <Route exact path="/" component={ LoginPage } />
      <Route path="/event" component={ EventPage } /> 
      <Route path="/detail/:id" component={ DetailPage } /> 
    </Switch>    
    </div> 
  
)