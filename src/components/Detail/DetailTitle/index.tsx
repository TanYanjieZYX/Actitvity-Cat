import React from 'react'
import './style.scss'

class Tab extends React.Component {
  render() {
    const { hash } = this.props
    return (
      <div className='wp-tab'>
        <a href='#detail' className={`tab-item tab-detail ${hash === '#detail' ? 'active' : ''}`}>
          Details
        </a>
        <a
          href='#participants'
          className={`tab-item tab-participants ${hash === '#participants' ? 'active' : ''}`}
        >
          Participants
        </a>
        <a
          href='#comments'
          className={`tab-item tab-comments ${hash === '#comments' ? 'active' : ''}`}
        >
          Comments
        </a>
      </div>
    )
  }
}

export default Tab
