import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import './style.scss'

class List extends PureComponent {
  constructor(props) {
    super(props)
    this.gotoDetail = this.gotoDetail.bind(this)
  }

  gotoDetail = () => {
    const { id } = this.props
    this.props.history.push(`/detail/${id}`)
  }

  render() {
    const {
      name,
      creator,
      channel,
      images,
      description,
      begin_time,
      end_time,
      me_going,
      me_likes,
      goings_count,
      likes_count
    } = this.props

    const testImg = 'http://4.pic.pc6.com/thumb/up/2016-06/14658669447180326_600_0.jpg'
    return (
      <div className='event-wrapper' onClick={this.gotoDetail}>
        <div className='event-header'>
          <img className='avatar' src={creator.avatar} alt='avatar'></img>
          <span className='username'>{creator.username}</span>
          <span className='channel'>{channel.name}</span>
        </div>
        <div className='event-content'>
          {images.length ? <img className='event-img' src={testImg} alt='event-img'></img> : null}
          <h3 className={`event-title ${images.length ? 'narrow' : ''}`}>{name}</h3>
          <p className='event-during'>
            <span className='iconfont icon-time'></span>
            {toCustomDate(begin_time, images.length)} - {toCustomDate(end_time, images.length)}
          </p>
        </div>
        <div className='event-desc'>{description}</div>
        <div className='event-footer'>
          <span className='going-status'>
            {me_going ? (
              <React.Fragment>
                <span className='iconfont icon-check'></span> I am going!
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span className='iconfont icon-check-outline'></span> {goings_count} Going
              </React.Fragment>
            )}
          </span>
          <span className='like-status'>
            {me_likes ? (
              <React.Fragment>
                <span className='iconfont icon-like'></span> I like it!
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span className='iconfont icon-like-outline'></span> {likes_count} Likes
              </React.Fragment>
            )}
          </span>
        </div>
      </div>
    )
  }
}

const toCustomDate = (dateStr, length) => {
  let dateArr = new Date(dateStr).toUTCString().split(' ')
  const newDateArr = []
  dateArr.forEach((item, index) => {
    if (index && index !== 5) {
      newDateArr.push(item)
    }
  })
  if (length) {
    newDateArr.pop()
  }
  return newDateArr.join(' ')
}

// 为了能从props中获取router history相关参数
export default withRouter(List)
