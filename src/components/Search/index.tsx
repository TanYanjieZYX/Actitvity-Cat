import * as React from 'react'
import { connect } from 'react-redux'
import * as Redux from 'redux'
import style from './style.scss'
import cn from 'classnames'

interface IProps {
  token: string
  search_show: boolean
  channels: any[]
  getChannelsAsync: (token: string) => void
  getEventsAsync: (token: string, params: string, text: string) => void
}

interface IState {
  date_selected: number
  channel_selected: number
  channel_selected_name: string
  date: any[]
}

const mapStateToProps = (state: React.ComponentState) => ({
  token: state.user.token,
  search_show: state.search.show,
  channels: state.search.channels
})

const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
  getChannelsAsync: (token: string) => dispatch({ type: 'GET_CHANNELS_ASYNC', token }),
  getEventsAsync: (token: string, params: string, text: string) =>
    dispatch({ type: 'GET_EVENTS_ASYNC', token, params, text })
})

const getTodayFirst = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}
const getTodayLast = () => {
  const date = new Date(new Date().getTime() + 86400000)
  date.setHours(0, 0, 0, 0)
  return date
}
const getTomorrowFirst = () => {
  const date = new Date(new Date().getTime() + 86400000)
  date.setHours(0, 0, 0, 0)
  return date
}
const getTomorrowLast = () => {
  const date = new Date(new Date().getTime() + 86400000 * 2)
  date.setHours(0, 0, 0, 0)
  return date
}
const getCurrentWeekFirst = () => {
  const timestamp = new Date().getTime()
  const dayOf = new Date().getDay()
  const date = new Date(timestamp - 86400000 * dayOf)
  date.setHours(0, 0, 0, 0)
  return date
}
const getCurrentWeekLast = () => {
  const weekFirst = getCurrentWeekFirst()
  const date = new Date(weekFirst.getTime() + 86400000 * 7)
  return date
}
const getCurrentMonthFirst = () => {
  const date = new Date()
  date.setDate(1)
  date.setHours(0, 0, 0, 0)
  return date
}
const getCurrentMonthFLast = () => {
  const date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  month++
  if (month > 12) {
    year++
    month = 1
  }
  const newDate = new Date(year, month - 1, 1, 24, 0, 0)
  return new Date(newDate.getTime() - 1000 * 60 * 60 * 24)
}

class Search extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      date_selected: -1,
      channel_selected: -1,
      channel_selected_name: '',
      date: [
        { name: 'ANYTIME' },
        { name: 'TODAY', after: getTodayFirst(), before: getTodayLast() },
        { name: 'TOMORROW', after: getTomorrowFirst(), before: getTomorrowLast() },
        { name: 'THIS WEEK', after: getCurrentWeekFirst(), before: getCurrentWeekLast() },
        { name: 'THIS MONTH', after: getCurrentMonthFirst(), before: getCurrentMonthFLast() }
      ]
    }
  }

  public componentDidMount() {
    this.props.getChannelsAsync(this.props.token)
  }
  public render() {
    return (
      <aside
        className={style.main}
        style={this.props.search_show ? { left: '0' } : { left: '-80vw' }}
      >
        <div className={style.date}>
          <span>DATE</span>
          <div>
            {this.state.date.map((item, index) => (
              <div
                key={index}
                className={
                  this.state.date_selected === index ? cn(style.tag, style.selected) : style.tag
                }
                onClick={this.selectDate.bind(this, index)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div className={style.channel}>
          <span>CHANNEL</span>
          <div>
            <div
              key={0}
              className={
                this.state.channel_selected === 0 ? cn(style.tag, style.selected) : style.tag
              }
              onClick={this.selectChannel.bind(this, 0, 'All')}
            >
              All
            </div>
            {this.props.channels.map(channel => (
              <div
                key={channel.id}
                className={
                  this.state.channel_selected === channel.id
                    ? cn(style.tag, style.selected)
                    : style.tag
                }
                onClick={this.selectChannel.bind(this, channel.id, channel.name)}
              >
                {channel.name}
              </div>
            ))}
          </div>
        </div>
        <div
          className={
            this.state.channel_selected !== -1 && this.state.date_selected !== -1
              ? style.button
              : cn(style.button, style.disabled)
          }
          onClick={this.search.bind(this, this.state, this.props)}
        >
          <div>
            <span className='iconfont icon-search'></span>
            <span>SEARCH</span>
          </div>
          {this.state.channel_selected !== -1 && this.state.date_selected !== -1 && (
            <div className={style.tips}>
              {this.state.channel_selected_name +
                ', ' +
                this.state.date[this.state.date_selected].name.toLowerCase()}
            </div>
          )}
        </div>
      </aside>
    )
  }
  public search(state: any, props: any) {
    if (state.channel_selected !== -1 && state.date_selected !== -1) {
      let params = ''
      let channel = ''
      let text = ''
      const dateAfter = state.date[state.date_selected].after
      const dateBefore = state.date[state.date_selected].before
      if (state.channel_selected === 0) {
        channel = props.channels.map((c: any) => c.id).join(',')
        text = 'all channels'
      } else {
        channel = state.channel_selected
        text = 'channel ' + state.channel_selected_name
      }
      // Anytime
      if (state.date_selected === 0) {
        params = 'channels=' + channel
        text += ' anytime'
      } else {
        params =
          'after=' +
          dateAfter.getTime() +
          '&before=' +
          dateBefore.getTime() +
          '&channels=' +
          channel
        text +=
          ' from ' +
          dateAfter.getDate() +
          '/' +
          (dateAfter.getMonth() + 1) +
          ' to ' +
          dateBefore.getDate() +
          '/' +
          (dateBefore.getMonth() + 1)
      }
      this.props.getEventsAsync(this.props.token, params, text)
    }
  }

  public selectDate(id: number) {
    this.setState({
      date_selected: id
    })
  }
  public selectChannel(id: number, name: string) {
    this.setState({
      channel_selected: id,
      channel_selected_name: name
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
