import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';

import { fetchEvents } from '../../actions/eventActions';
import { SEARCH_CHANNEL } from '../../constants';

import './EventPage.css';

import EventsList from './EventsList';
import SearchPage from '../search/SearchPage'; 
import NoResult from '../search/NoResult';


class EventPage extends PureComponent{
      static propTypes = {
        events: PropTypes.array.isRequired,
        fetchEvents: PropTypes.func.isRequired
      }
      state = {
        openSearch: false,
        searchParams: null
      }

      componentDidMount() {

        var menuButton = document.querySelector('.menu-button');
        // eslint-disable-next-line
        var swiper = new Swiper('.swiper-container', {
          slidesPerView: 'auto',
          initialSlide: 1,
          resistanceRatio: 0,
          slideToClickedSlide: true,
          on: {
            init: function () {
              var slider = this;
              menuButton.addEventListener('click', function () {
                if (slider.activeIndex === 0) {
                  slider.slideNext();
                } else {
                  slider.slidePrev();
                }
              }, true);
            },
            slideChange: function () {
              var slider = this;
              if (slider.activeIndex === 0) {
                menuButton.classList.add('cross');
              } else {
                menuButton.classList.remove('cross');
              }
            },
          }
        });
        this.props.fetchEvents();
      }
      getText () {
        const { searchParams } = this.state
        if (!(searchParams.channel && searchParams.time)) return null
        const { channel: { name: channel }, start, end } = searchParams
        if(searchParams.start && searchParams.end){
          return 'Searched for ' + channel + ' Activities from ' + start.format('MM/DD') + ' to ' + end.format('MM/DD');
        }else{
          return 'Searched for' + channel + 'Activities';
        }      
      }

      search = (searchParams) => {
        const { fetchEvents } = this.props
        this.setState({ openSearch: false, searchParams })
    
        const query = { offset: 0 }
        if (searchParams.channel.id !== SEARCH_CHANNEL.ALL) {
          query.channels = searchParams.channel.id
        }
    
        if (searchParams.start && searchParams.end) {
          query.before = searchParams.end.valueOf()
          query.after = searchParams.start.valueOf()
        }
        fetchEvents(query);
      }
      
      clearSearch = () => {
        this.setState({ searchParams: null })
        const { fetchEvents } = this.props
        fetchEvents();
      }

  render(){
    
    const { events } = this.props
    const { searchParams } = this.state
    return (
      <div className="swiper-container">

            <div className="swiper-wrapper">

                  <div className="swiper-slide menu">
                      <SearchPage onSearch={this.search}  /> 
                  </div>

                 <div className="swiper-slide content">

                        <div className="content-header">
                            <div className="menu-button">
                              <span className="iconfont icon-search"></span>
                            </div> 
                            <div className="cat">
                              <span className="iconfont icon-logo-cat"></span>
                            </div>
                            <div className="user-avatar">
                              <span className="iconfont icon-logo-cat"></span> 
                            </div>
                        </div>                        
                          {searchParams ? (
                            <div className='search-summary'>
                              <div className='search-header'>
                                <span className='search-result'>{events.length} Results</span>
                                <button onClick={this.clearSearch}>CLEAR SEARCH</button>
                              </div>
                              <div className='search-desc'>
                                {this.getText()}
                              </div>
                            </div>
                          ) : null}                        
                        <div className="content-list">
                          {events.length?
                            <EventsList events={events}/>
                              :<NoResult />
                          }
                        </div>                        
                  </div>
            </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    events: state.events,
    event: state.event
  };
};

export default connect(mapStateToProps,{fetchEvents})(EventPage);
