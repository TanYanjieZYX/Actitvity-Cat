import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actionCreators from '../../actions/authActions'
import './style.scss'

class Login extends PureComponent {
  render() {
    const { loginStatus } = this.props
    if (!loginStatus) {
      return (
        <div className='login-wrapper'>
          <p className='desc'>FIND THE MOST LOVED ACTIVITIES</p>
          <h2 className='app-name'>BLACK CAT</h2>
          <div className='logo'>
            <span className='iconfont icon-logo-cat' />
          </div>
          <div className='userinfo'>
            <div className='input-group'>
              <span className='iconfont icon-user' />
              <input
                type='text'
                className='custom-input username'
                placeholder='Username'
                ref={input => {
                  this.account = input
                }}
              />
            </div>
            <div className='input-group'>
              <span className='iconfont icon-password' />
              <input
                type='password'
                className='custom-input username'
                placeholder='Password'
                ref={input => {
                  this.password = input
                }}
              />
            </div>
          </div>
          <button className='submit' onClick={() => this.props.login(this.account, this.password)}>
            SIGN IN
          </button>
        </div>
      )
    } else {
      return <Redirect to='/home' />
    }
  }
}

const mapState = state => ({
  loginStatus: state.getIn(['login', 'loginStatus'])
})

const mapDispatch = dispatch => ({
  login(accountEle, passwordEle) {
    dispatch(actionCreators.login(accountEle.value, passwordEle.value))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Login)
