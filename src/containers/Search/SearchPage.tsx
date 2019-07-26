import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchChannels } from '../../actions/channelActions'

import './style.scss'

import { SEARCH_TIMES, SEARCH_CHANNEL } from '../../constants'
import moment from 'moment'
import DatePicker from '../../components/DatePicker'

class SearchPage extends PureComponent {
  static propTypes = {
    channels: PropTypes.array.isRequired,
    fetchChannels: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
  }

  state = {
    time: null,
    channel: null,
    start: '',
    end: ''
  }
  doms = {}

  componentDidMount() {
    this.props.fetchChannels()
  }

  getTimes() {
    return [
      { name: 'ANYTIME', value: SEARCH_TIMES.ANYTIME },
      { name: 'TODAY', value: SEARCH_TIMES.TODAY },
      { name: 'TOMORROW', value: SEARCH_TIMES.TOMORROW },
      { name: 'THIS WEEK', value: SEARCH_TIMES.THIS_WEEK },
      { name: 'THIS MONTH', value: SEARCH_TIMES.THIS_MONTH },
      { name: 'LATER', value: SEARCH_TIMES.LATER }
    ]
  }
  getChannels() {
    const ret = [{ id: SEARCH_CHANNEL.ALL, name: 'ALL' }]
    const { channels } = this.props
    return ret.concat(channels)
  }
  getText(disabled) {
    if (disabled) return null
    const { start: currentStart, end: currentEnd, channel: currentChannel } = this.state

    if (currentStart && currentEnd) {
      return (
        currentChannel.name +
        ' Activities from ' +
        currentStart.format('MM/DD') +
        ' to ' +
        currentEnd.format('MM/DD')
      )
    } else {
      return currentChannel.name + 'Activities'
    }
  }

  search = () => {
    const { onSearch } = this.props

    if (typeof onSearch === 'function') {
      onSearch(this.state)
      console.log(this.state)
    }
  }

  changeSearchParams = (type, value) => {
    const result = {
      ...this.state
    }

    if (type === 'time') {
      if (value === SEARCH_TIMES.ANYTIME) {
        result.start = ''
        result.end = ''
      } else if (value === SEARCH_TIMES.TODAY) {
        result.start = moment().startOf('day')
        result.end = moment().endOf('day')
      } else if (value === SEARCH_TIMES.TOMORROW) {
        result.start = moment()
          .add(1, 'days')
          .startOf('day')
        result.end = moment()
          .add(1, 'days')
          .endOf('day')
      } else if (value === SEARCH_TIMES.THIS_WEEK) {
        result.start = moment().startOf('week')
        result.end = moment().endOf('week')
      } else if (value === SEARCH_TIMES.THIS_MONTH) {
        result.start = moment().startOf('month')
        result.end = moment().endOf('month')
      } else if (value === SEARCH_TIMES.LATER && this.state.time !== SEARCH_TIMES.LATER) {
        result.start = ''
        result.end = ''
      }
    }

    result[type] = value

    if (['start', 'end'].includes(type)) {
      result[type] = moment(value)
    }

    this.setState(result)
  }

  isDisabled() {
    const { channel, time, start, end } = this.state

    if (!channel) return true

    if (!time) return true

    if (time === SEARCH_CHANNEL && !(start && end)) return true

    return false
  }

  render() {
    const times = this.getTimes()
    const channels = this.getChannels()
    const { time, channel, start, end } = this.state
    const startText = start ? start.format('YYYY-MM-DD') : start
    const endText = end ? end.format('YYYY-MM-DD') : end
    const disabled = this.isDisabled()
    const text = this.getText(disabled, channels)
    console.log(text)
    return (
      <div className='search-container'>
        <div className='char-date'>DATE</div>
        <hr className='hr-date' />
        <div className='date-container'>
          {times.map(item => (
            <button
              className='time'
              key={item.name}
              onClick={() => this.changeSearchParams('time', item.value)}
              disabled={time === item.value}
              ref={c => {
                this.doms[item.value] = c
              }}
            >
              {item.name}
            </button>
          ))}
          {time === SEARCH_TIMES.LATER ? (
            <DatePicker
              triggerNode={this.doms[SEARCH_TIMES.LATER]}
              onPicker={this.changeSearchParams}
              start={startText}
              end={endText}
            />
          ) : null}
        </div>
        <div className='char-channel'>CHANNEL</div>
        <hr className='hr-channel' />
        <div className='channel-container'>
          {channels.map(item => (
            <button
              className='channel'
              key={item.id}
              disabled={channel && channel.id === item.id}
              onClick={() => this.changeSearchParams('channel', item)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className='search'>
          <span className='iconfont icon-search' />
          <button className='search-button' disabled={disabled} onClick={this.search}>
            SEARCH
          </button>
          {text ? <div className='search-text'>{text}</div> : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    channels: state.channels
  }
}

export default connect(
  mapStateToProps,
  { fetchChannels }
)(SearchPage)
