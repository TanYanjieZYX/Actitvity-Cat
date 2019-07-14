import React from 'react'
import './style.scss'
class SearchNone extends React.Component {
  render() {
    return (
      <div className='search-none'>
        <span className='iconfont icon-no-activity'></span>
        <p>No activity found</p>
      </div>
    )
  }
}

export default SearchNone
