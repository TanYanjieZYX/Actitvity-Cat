import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getEventDetail } from '../../actions/detailAction';
import CommentBox from './CommentBox';
import moment from 'moment';
import './DetailPage.css';
import googlemap from '../../assets/imgs/gmap.png';

class DetailPage extends PureComponent {
  constructor(props) {
    super(props);
    this.transEvent = this.transEvent.bind(this);
  }
  transEvent() {
    this.props.history.push('/event');
  }

  componentDidMount() {
    const { match } = this.props;
    const eventId = match.params.id;
    if (eventId) {
      this.props.getEventDetail(eventId)
    }
  }

  render() {
     const{ event, joinUsers, comments, likeUsers} = this.props
     let publish_time = moment(event.create_time).fromNow();
     let new_begin = moment(event.begin_time).format('D MMM YYYY HH:mm ');
     let new_end = moment(event.end_time).format('D MMM YYYY HH:mm ');
     return(
     
    <React.Fragment>
       <div className="content-header">
         <div className="menu-button">
              <span className="iconfont icon-home"></span>
          </div> 
          <div className="cat">
              <span className="iconfont icon-logo-cat"></span>
          </div>
          <div className="user-avatar">
              <span className="iconfont icon-logo-cat"></span> 
          </div>
        </div>    
          <div className="detail-wrapper">
                  <div className="detail-header">          
                    <span className="channel-name">
                      {event.channel ? event.channel.name : ''}
                    </span>
                    <h2 className="event-name">{event.name}</h2>
                      <div className="user-wrapper">
                        <img
                          className="user-avator"
                          src={event.creator ? event.creator.avatar : ''}
                          alt="avator"
                        />
                          <div className="user-info">
                              <span className="user-name">
                                {event.creator ? event.creator.username : ''}
                              </span>
                              <span className="create-time">
                                Published {publish_time}
                              </span>
                          </div>
                      </div>
                  </div>

              <div className="event-type">
                  <span className="type-item is-view">
                    <span className="iconfont icon-info-outline"></span>Details
                  </span>
                  <span className="type-item">
                    <span className="iconfont icon-people-outline"></span>Participants
                  </span>
                  <span className="type-item">
                    <span className="iconfont icon-comment-outline"></span>Comments
                  </span>
              </div>

            <div className="detail-content">
              <div className="event-info">
                  <p className="event-desc">{event.description}</p>
                  <div className="divider"></div>
                  <div className="info-box">
                    <h4 className="event-element">When</h4>
                    <div className="date-box">
                          <div className="date-item">
                            <span className="iconfont icon-date-from"></span>
                                    {new_begin}
                          </div>
                          <div className="date-item">
                            <span className="iconfont icon-date-to"></span>
                                    {new_end}
                          </div>
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className="info-box">
                    <h4 className="event-element">Where</h4>
                    <span className="main-address">{event.location}</span>
                    <span className="sub-address">{event.location_detail}</span>
                    <img src={googlemap} alt="googlemap" className="google-map" />
                  </div>
                  </div>
              <div className="user-box">
                <div className="join-user">
                  <span className="user-type">
                    <span className="iconfont icon-check-outline"></span>
                    {event.goings_count} going
                  </span>
                  <div className="avator-box">
                    {event.goings_count
                      ? joinUsers.map(item => {
                          return (
                            <img
                              className="avator-item"
                              src={item.avatar}
                              key={item.id}
                              alt=""
                            />
                          )
                        })
                      : null}
                  </div>
                </div>
                <div className="divider"></div>
                <div className="like-user">
                  <span className="user-type">
                    <span className="iconfont icon-like-outline"></span>
                    {event.likes_count} likes
                  </span>
                  <div className="avator-box">
                    {event.likes_count
                      ? likeUsers.map(item => {
                          return (
                            <img
                              className="avator-item"
                              src={item.avatar}
                              key={item.id}
                              alt=""
                            />
                          )
                        })
                      : null}
                  </div>
                </div>
              </div>
              {comments.length ? (
                <div className="comment-box">
                  {comments.map(item => {
                    return <CommentBox key={item.id} {...item}></CommentBox>
                  })}
                </div>
              ) : null}
            </div>
            <div className="detail-footer">
              <div className="left-container">
                <span className="iconfont icon-comment-single"></span>
                <span className="iconfont icon-like-outline"></span>          
              </div>
              <div className="right-container">
                <span className="iconfont icon-check-outline"></span> 
                <span className="text">Join</span>
              </div>
            </div>
          </div>
    </React.Fragment>
             
     )
    }
}


const mapState = state =>({
  event:state.details.event,
  joinUsers:state.details.joinUsers, 
  comments:state.details.comments,
  likeUsers:state.details.likeUsers
  // event: state.getIn(['detail', 'event']).toJS(),
  // likeUsers: state.getIn(['detail', 'likeUsers']).toJS(),
  // joinUsers: state.getIn(['detail', 'joinUsers']).toJS(),
  // comments: state.getIn(['detail', 'comments']).toJS()
}) 


const mapDispatch = dispatch => ({
  getEventDetail(id) {
    dispatch(getEventDetail(id))
  }
})

export default connect(
  mapState,
  mapDispatch
)(DetailPage)
