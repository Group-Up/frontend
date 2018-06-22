import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as routes from '../../utils/routes';
import './event-item.scss';

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
          <h3>{title}</h3>
          <h4> Date: {eventDate} | Location: {location}</h4>
          <img src={imageUrl}/>
          <button>Click to view</button>
        </div>
      </Link>
    );
  }
}

EventItem.propTypes = {
  event: PropTypes.object,
};

export default EventItem;
