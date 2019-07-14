import React from 'react'
import './style.scss'

class ActionBar extends React.Component {
  render() {
    const { event, onLike, onJoin, showComment } = this.props
    return (
      <div className='wp-actionbar'>
        <div className='actionbar-act'>
          <button className='act-comment' onTouchStart={showComment}></button>
          <button
            className={`act-like ${event.me_likes ? 'active' : ''}`}
            onTouchStart={onLike}
          ></button>
        </div>
        <div className='actionbar-join'>
          <button className={event.me_going ? 'active' : ''} onTouchStart={onJoin}>
            {event.me_going ? 'I am going' : 'Join'}
          </button>
        </div>
      </div>
    )
  }
}

export default ActionBar
