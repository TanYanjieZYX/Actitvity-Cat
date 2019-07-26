import React, { PureComponent } from 'react'
import './style.scss'

class Header extends PureComponent {
  render() {
    const { avatar, isHome, openSearch, gotoHome } = this.props
    return (
      <div className='header-wrapper'>
        {isHome ? (
          <span className='iconfont icon-search' onClick={openSearch}></span>
        ) : (
          <span className='iconfont icon-home' onClick={gotoHome}></span>
        )}
        <span className='iconfont icon-logo-cat'></span>
        {avatar ? (
          <img className='user-avatar' src={avatar} alt='avatar' />
        ) : (
          <img
            className='user-avatar'
            src='https://coding.net/static/fruit_avatar/Fruit-1.png'
            alt='avatar'
          />
        )}
      </div>
    )
  }
}

export default Header
