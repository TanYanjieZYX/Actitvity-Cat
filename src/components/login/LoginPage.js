import React, { Component } from 'react';
import LoginForm from './LoginForm';
import './LoginPage.css';

class LoginPage extends Component {
  render() {
    return (
        <div className="background">
          <div className="bg-image">
            <div className="tag">FIND THE MOST LOVED ACTIVITIES</div>
            <div className="name">BLACK CAT</div>
            <div className="iconcat">              
              <span className="iconfont icon-logo-cat"></span>  
            </div>
              <LoginForm />
          </div>          
        </div>
    );
  }
}

export default LoginPage;