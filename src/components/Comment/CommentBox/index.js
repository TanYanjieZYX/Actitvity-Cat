import React, { PureComponent } from 'react'
import './style.scss'

class Comment extends PureComponent {
  render() {
    const { user, comment, create_time } = this.props
    return (
      <div className='comment-wrapper'>
        <img className='comment-user' src={user.avatar} alt=''></img>
        <div className='comment-box-inner'>
          <p className='comment-info'>
            <span className='comment-name'>{user.username}</span>
            <span className='comment-time'>{toDateStr(create_time)}</span>
          </p>
          <p className='comment-text'>{comment}</p>
          <span className='iconfont icon-reply'></span>
        </div>
      </div>
    )
  }
}

const toDateStr = str => {
  let date = new Date(str).toUTCString().split(' ')
  let newDateArr = []
  date.forEach((item, index) => {
    if (index && index !== 4 && index !== 5) {
      newDateArr.push(item)
    }
  })
  return newDateArr.join(' ')
}

export default Comment
