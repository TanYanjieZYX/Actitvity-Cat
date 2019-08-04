import React from 'react'
import style from './style.scss'

class Error extends React.Component {
  render() {
    // const vHeight = window.screen.height
    return (
      <div className={style.errorBox}>
        <img src={require('../../assets/imgs/error.png')} alt='error' />
        <p className={style.errorMsg}>
          Oops! Lose your way.Turn to the <a href='http://localhost:3000'>Login Page</a>!
        </p>
      </div>
    )
  }
}

export default Error
