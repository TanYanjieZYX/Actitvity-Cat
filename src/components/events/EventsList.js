import React from 'react';
import PropTypes from 'prop-types';
import EventCard from './EventCard';

const EventsList = ({ events }) => {
  const emptyMessage = (
    <p>There are no events yet in your collection.</p>
  );
  const eventsList = (
    <div className="list-container">
      { events.map(event => <EventCard event={ event } key={ event.id } />) }
    </div>
  );

  return (
    <div className="eventlist">
      { events.length === 0 ? emptyMessage : eventsList }
    </div>
  )
}

EventsList.propTypes = {
  events: PropTypes.array.isRequired
}

export default EventsList;
