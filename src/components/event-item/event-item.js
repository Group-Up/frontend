import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as routes from '../../utils/routes';

class EventItem extends React.Component {
  render() {
    const { event } = this.props;
    const {
      title, eventDate, location, imageUrl,
    } = event;
    const route = `${routes.EVENT}/${event._id}`;
    return (
      <Link to={route}>
        <div className='event-item'>
          <h4>Event: {title} | {eventDate} | {location}</h4>
          <img src={imageUrl}/>
        </div>
      </Link>
    );
  }
}

EventItem.propTypes = {
  event: PropTypes.object,
};

export default EventItem;
