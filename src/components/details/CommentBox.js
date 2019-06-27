import React, { PureComponent } from 'react'
import moment from 'moment';

class CommentBox extends PureComponent {
  render() {
    const { user, comment, create_time } = this.props
    let time = moment(create_time).fromNow();
    return (
      <div className="comment-wrapper">
        <img className="comment-user" src={user.avatar} alt=""></img>
        <div className="comment-box-inner">
          <p className="comment-info">
            <span className="comment-name">{user.username}</span>
            <span className="comment-time">{time}</span>
          </p>
          <p className="comment-text">{comment}</p>
          <span className="iconfont icon-reply"></span>
        </div>
      </div>
    )
  }
}

export default CommentBox;
