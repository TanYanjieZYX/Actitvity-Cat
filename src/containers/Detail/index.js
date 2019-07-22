import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actionCreators from '../../actions/detailActions'
import Header from '../../components/Header'
import Comment from '../../components/Comment/CommentBox'
import './style.scss'

class Detail extends PureComponent {
  constructor(props) {
    super(props)
    this.gotoHome = this.gotoHome.bind(this)
  }
  gotoHome() {
    this.props.history.push('/')
  }
  render() {
    const { event, likeUsers, joinUsers, comments, loginStatus } = this.props
    if (!loginStatus) {
      return <Redirect to='/login' />
    } else {
      return (
        <React.Fragment>
          <Header gotoHome={this.gotoHome}></Header>
          <div className='detail-wrapper'>
            <div className='detail-header'>
              <span className='channel-name'>{event.channel ? event.channel.name : ''}</span>
              <h2 className='event-name'>{event.name}</h2>
              <div className='user-wrapper'>
                <img
                  className='user-avator'
                  src={event.creator ? event.creator.avatar : ''}
                  alt='avator'
                />
                <div className='user-info'>
                  <span className='user-name'>{event.creator ? event.creator.username : ''}</span>
                  <span className='create-time'>Published {toDateStr(event.create_time)}</span>
                </div>
              </div>
            </div>
            <div className='event-type'>
              <span className='type-item is-view'>
                <span className='iconfont icon-info'></span>Details
              </span>
              <span className='type-item'>
                <span className='iconfont icon-people'></span>Participants
              </span>
              <span className='type-item'>
                <span className='iconfont icon-comment'></span>Comments
              </span>
            </div>
            <div className='detail-content'>
              <div className='event-info'>
                <p className='event-desc'>{event.description}</p>
                <div className='divider'></div>
                <div className='info-box'>
                  <h4 className='event-element'>When</h4>
                  <div className='date-box'>
                    <div className='date-item'>
                      <span className='iconfont icon-date-from'></span>
                      {toDateStr(event.begin_time)}
                    </div>
                    <div className='date-item'>
                      <span className='iconfont icon-date-to'></span>
                      {toDateStr(event.end_time)}
                    </div>
                  </div>
                </div>
                <div className='divider'></div>
                <div className='info-box'>
                  <h4 className='event-element'>Where</h4>
                  <span className='main-address'>{event.location}</span>
                  <span className='sub-address'>{event.location_detail}</span>
                </div>
              </div>
              <div className='user-box'>
                <div className='join-user'>
                  <span className='user-type'>
                    <span className='iconfont icon-check-outline'></span>
                    {event.goings_count} going
                  </span>
                  <div className='avator-box'>
                    {event.goings_count
                      ? joinUsers.map(item => {
                          return (
                            <img className='avator-item' src={item.avatar} key={item.id} alt='' />
                          )
                        })
                      : null}
                  </div>
                </div>
                <div className='divider'></div>
                <div className='like-user'>
                  <span className='user-type'>
                    <span className='iconfont icon-like-outline'></span>
                    {event.likes_count} likes
                  </span>
                  <div className='avator-box'>
                    {event.likes_count
                      ? likeUsers.map(item => {
                          return (
                            <img className='avator-item' src={item.avatar} key={item.id} alt='' />
                          )
                        })
                      : null}
                  </div>
                </div>
              </div>
              {comments.length ? (
                <div className='comment-box'>
                  {comments.map(item => {
                    return <Comment key={item.id} {...item}></Comment>
                  })}
                </div>
              ) : null}
            </div>
            <div className='detail-footer'>
              <div className='left-container'>
                <span className='iconfont icon-comment-single'></span>
                <span className='iconfont icon-like-outline'></span>
              </div>
              <div className='right-container'>
                <span className='iconfont icon-check-outline'></span>
                <span className='text'>join</span>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
  componentDidMount() {
    const { match } = this.props
    const eventId = match.params.id
    if (eventId) {
      this.props.getEventDetail(eventId)
    }
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

const mapState = state => ({
  // login
  user: state.getIn(['login', 'user']),
  loginStatus: state.getIn(['login', 'loginStatus']),
  // event
  event: state.getIn(['detail', 'event']).toJS(),
  likeUsers: state.getIn(['detail', 'likeUsers']).toJS(),
  joinUsers: state.getIn(['detail', 'joinUsers']).toJS(),
  comments: state.getIn(['detail', 'comments']).toJS()
})

const mapDispatch = dispatch => ({
  getEventDetail(id) {
    dispatch(actionCreators.getEventDetail(id))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Detail)
