import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EventForm from '../event-form/event-form';
import * as eventActions from '../../actions/event';
import { WELCOME } from '../../text';
// import ImageForm from '../image-form/image-form';
// import * as imageActions from '../../actions/images';

class Dashboard extends React.Component {
  render() {
    return (
      <div className='dashboard'>
        <h1> {WELCOME} </h1>
        <h2> You can only see this if you are logged in </h2>
        {/* <ImageForm onComplete={this.props.doCreateImage} /> */}
        <EventForm onComplete={this.props.doCreateEvent}/>
      </div>
    );
  }
}

Dashboard.propTypes = {
  doCreateEvent: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  doCreateEvent: event => dispatch(eventActions.eventCreateRequest(event)),
});

export default connect(null, mapDispatchToProps)(Dashboard);
