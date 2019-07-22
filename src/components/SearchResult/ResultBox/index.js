import React, { PureComponent } from 'react'
import './style.scss'

class ResultBox extends PureComponent {
  render() {
    const { eventList, clearSearch } = this.props
    return (
      <div className='result-box'>
        <span className='result-num'>{eventList.length} Results</span>
        <span className='clear-search' onClick={() => clearSearch()}>
          CLEAR SEARCH
        </span>
        <p className='search-type'>Searched for Channel...</p>
      </div>
    )
  }
}

export default ResultBox
