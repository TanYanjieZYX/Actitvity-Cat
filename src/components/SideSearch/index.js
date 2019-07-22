import React, { PureComponent } from 'react'
import './style.scss'

class SideSearch extends PureComponent {
  render() {
    const { isSearch, channelList, toggleFilterChannel, selectChannels, filterEvent } = this.props
    return (
      <div className={`sideSearch ${isSearch ? '' : 'hide'}`}>
        <div className='search-header'>
          <span className='search-header-text'>CHANNEL</span>
        </div>
        <div className='search-channel'>
          {channelList.map(item => (
            <span
              className={`channel-item ${
                selectChannels.indexOf(item.id) >= 0 ? 'is-selected' : ''
              }`}
              key={item.id}
              onClick={() => toggleFilterChannel(selectChannels, item.id)}
            >
              {item.name}
            </span>
          ))}
        </div>
        <div
          className={`search-footer ${selectChannels.length ? 'is-selected' : ''}`}
          onClick={() => {
            if (selectChannels.length) {
              filterEvent(selectChannels.join())
            }
          }}
        >
          <span className='iconfont icon-search'></span>SEARCH
        </div>
      </div>
    )
  }
}

export default SideSearch
