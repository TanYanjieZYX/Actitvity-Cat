import React from 'react'
import PropTypes from 'prop-types'
import ChannelCard from '../ChannelsCard'
import './style.scss'

const ChannelsList = ({ channels, selectAll }) => {
  return (
    <div className='tag-container'>
      <div className='channel-list'>
        <div className='channelcard' onClick={selectAll} data-select='-1'>
          All
        </div>
        {channels.map(channel => (
          <ChannelCard channel={channel} key={channel.id} />
        ))}
      </div>
    </div>
  )
}

ChannelsList.propTypes = {
  channels: PropTypes.array.isRequired,
  selectAll: PropTypes.func.isRequired
}

export default ChannelsList
