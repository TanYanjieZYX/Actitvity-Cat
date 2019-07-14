import React from 'react'
import './style.scss'

class SearchResult extends React.Component {
  render() {
    return (
      <div className='search-result'>
        <h4>{`${this.props.searchLength} Results`}</h4>
        <p>{`Searched for ${
          this.props.searchChannels.length > 2
            ? this.props.searchChannels[0] + ' and so on'
            : this.props.searchChannels.toString()
        } Activities ${this.props.searchTime}`}</p>
        <button onTouchStart={this.props.clearSearch}>CLEAR SEARCH</button>
      </div>
    )
  }
}

export default SearchResult
