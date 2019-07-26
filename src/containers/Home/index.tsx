import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as _ from 'lodash'
import * as actionCreators from '../../actions/eventActions.tsx'
import Header from '../../components/Header/index.tsx'
import SideSearch from '../../components/SideSearch/index.tsx'
import ResultBox from '../../components/SearchResult/ResultBox/index.tsx'
import NoResult from '../../components/SearchResult/NoResult/index.tsx'
import List from '../../components/List/index.tsx'
import './style.scss'

class Home extends PureComponent {
  render() {
    const {
      eventList,
      user,
      isHome,
      isSearch,
      openSearch,
      selectChannels,
      loginStatus
    } = this.props
    if (!loginStatus) {
      return <Redirect to='/login' />
    } else {
      return (
        <div className='home-wrapper'>
          <div className='container-wrapper'>
            <SideSearch {...this.props}></SideSearch>
            <div className={`content-wrapper ${isSearch ? 'is-search' : ''}`}>
              <Header {...user} isHome={isHome} openSearch={openSearch}></Header>
              {selectChannels.length ? <ResultBox {...this.props}></ResultBox> : null}
              {eventList.length ? (
                eventList.map(item => <List key={item.id} {...item}></List>)
              ) : (
                <NoResult></NoResult>
              )}
            </div>
          </div>
        </div>
      )
    }
  }

  componentDidMount() {
    this.props.getEventsData(this.props.offsetNum, this.props.selectChannels)
    this.props.getChannelData()
    this.bindEvents = _.throttle(this.bindEvents.bind(this), 300)
    window.addEventListener('scroll', this.bindEvents)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.bindEvents)
  }

  bindEvents() {
    this.props.scrollEvent(this.props.offsetNum, this.props.selectChannels, this.props.eventHasMore)
  }
}

const mapState = state => ({
  // login
  user: state.getIn(['login', 'user']),
  loginStatus: state.getIn(['login', 'loginStatus']),
  // home
  eventList: state.getIn(['home', 'events']).toJS(),
  offsetNum: state.getIn(['home', 'offsetNum']),
  eventHasMore: state.getIn(['home', 'eventHasMore']),
  isHome: state.getIn(['home', 'isHome']),
  isSearch: state.getIn(['home', 'isSearch']),
  channelList: state.getIn(['home', 'channels']),
  selectChannels: state.getIn(['home', 'selectChannels']).toJS()
})

const mapDispatch = dispatch => ({
  getEventsData(offset, selectChannels) {
    dispatch(actionCreators.getEventsList(offset, selectChannels))
  },
  getChannelData() {
    dispatch(actionCreators.getChannleList())
  },
  scrollEvent(offset, selectChannels, hasMore) {
    const { scrollTop, offsetHeight } = document.documentElement
    if (offsetHeight - scrollTop < 1000 && hasMore) {
      dispatch(actionCreators.getEventsList(offset, selectChannels))
    }
  },
  openSearch() {
    dispatch(actionCreators.openSearch())
  },
  closeSearch() {
    dispatch(actionCreators.closeSearch())
  },
  clearSearch() {
    dispatch(actionCreators.clearSearch())
  },
  toggleFilterChannel(selectChannels, channelId) {
    if (selectChannels.indexOf(channelId) >= 0) {
      dispatch(actionCreators.deleteFilterChannel(channelId))
    } else {
      dispatch(actionCreators.addFilterChannel(channelId))
    }
  },
  filterEvent(channelIDs) {
    dispatch(actionCreators.closeSearch())
    dispatch(actionCreators.getEventsListByFilter(channelIDs))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Home)
