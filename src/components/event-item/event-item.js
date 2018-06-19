import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as eventActions from '../../actions/event';

class EventItem extends React.Component {
  render() {
    const {
      title, eventDate, location, imageUrl, _id,
    } = this.props.event;

    return (
      <div className='event-item'>
        <h4>Event: {title} | {eventDate} | {location}</h4>
        <img src={imageUrl}/>
        <button onClick={() => this.props.pGetEvent(_id)}>Event Details</button>
      </div>
    );
  }
}

EventItem.propTypes = {
  event: PropTypes.object,
  key: PropTypes.number,
  pGetEvent: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  pGetEvent: event => dispatch(eventActions.getEventRequest(event)),
});

export default connect(null, mapDispatchToProps)(EventItem);
