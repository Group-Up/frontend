import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as eventActions from '../../actions/event';
import autobind from '../../utils/autobind';
import * as routes from '../../utils/routes';
import EventPage from '../event-page/event-page';

class EventItem extends React.Component {
  // constructor(props) {
  //   super(props);
  //   autobind.call(this, EventItem);
  // }

  render() {
    const {
      title, eventDate, location, imageUrl,
    } = this.props.event;
    const route = `${routes.EVENT}/${this.props.event._id}`;
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
  key: PropTypes.number,
  pGetEvent: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  pGetEvent: event => dispatch(eventActions.getEventRequest(event)),
});

export default connect(null, mapDispatchToProps)(EventItem);
