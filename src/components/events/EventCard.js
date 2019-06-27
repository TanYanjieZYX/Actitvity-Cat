import React, { PureComponent } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class EventCard extends PureComponent {
  constructor(props) {
    super(props)
    this.transDetail = this.transDetail.bind(this)
  }

  transDetail = () => {
    const { id } = this.props.event
    this.props.history.push(`/detail/${id}`)
  }
  renderUser () {
    const { creator:user, channel } = this.props.event

    return (
      <div className="user-container">
        <img src={user.avatar} alt="avatar"></img>
        <div className="username">{user.username}</div>
        <div className="channel">{channel.name}</div>
      </div>
    );
  }

  renderTitle () {
    const { name } = this.props.event

    return (
      <div className="title">
        {name}
      </div>
    )
  }

  renderTime () {
    const { begin_time, end_time } = this.props.event
    let new_begin = moment(begin_time).format('D MMM YYYY HH:mm ');
    let new_end = moment(end_time).format('D MMM YYYY HH:mm ');
    return (
      <div className="time">
        <span className="iconfont icon-time"></span>
        <div className="format">
          <div className="begin">{new_begin}</div>
          <span>-</span>
          <div className="end">{new_end}</div>
        </div>
      </div>
    )
  }
  
  renderDetail () {
    const { description } = this.props.event

    return (
      <div className="desc">
         {description}
      </div>
    )
  }

  renderImage () {
    const { images, name } = this.props.event

    if (!(images && images.length)) return null

    return (
      <div className='image-container'>
        <img src={images[0]} alt={name} />
      </div>
    )
  }
  renderGoing () {
    const { me_going, goings_count } = this.props.event

    if (me_going) {
      return (
        <div className="megoing">
          <span className="iconfont icon-check"></span>
          <span className="igoing">I am going!</span>
        </div>
      )
    }else{
      return (
        <div className="going">
          <span className="iconfont icon-check-outline"></span>
          <span className="goingcount">{goings_count}&nbsp;Going</span>
        </div>
      )
    }
  }

  renderLike () {
    const { me_likes, likes_count } = this.props.event

    if (me_likes) {
      return (
        <div clasName="melike">
          <span className="iconfont icon-like"></span>
          <span className="ilike">I like it</span>
        </div>
      )
    }else{
      return (
        <div className="like">
          <span className="iconfont icon-like-outline"></span>
          <span className="likecount">{likes_count}&nbsp;Likes</span>
        </div>
      )
    }
 }

 render () {
      return (
          <div className="eventcard" onClick={this.transDetail}>
               
                      {this.renderUser()}
                <div className="flex-box">
                  <div className="flex-content">
                      {this.renderTitle()}
                      {this.renderTime()}
                      {this.renderDetail()}
                  </div>
                  <div className="flex-image">
                      {this.renderImage () }
                  </div>
                </div>
                <div className="hobby">
                  {this.renderGoing()}
                  {this.renderLike()}
                </div>
            <hr className="hr" />
          </div>
        )
  }  
  
}


export default withRouter(EventCard);