import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autobind';

const defaultState = {
  title: '',
  description: '',
  eventDate: '',
  // imageUrl: '',
  location: '',
  isPublic: false,
  profile: '',
};

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.event || defaultState;
    autoBind.call(this, EventForm);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState(this.props.event ? this.state : defaultState);
    return this.props.onComplete(this.state);
  }

  render() {
    const buttonText = this.props.event ? 'Update' : 'Create Event';
    return (
      <div className='event-form'>
        <form onSubmit={this.handleSubmit} className='event-form'>
        <input
          type='text'
          name='title'
          placeholder='Event Title'
          value={this.state.title}
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='description'
          placeholder='Event Description'
          value={this.state.description}
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='eventDate'
          placeholder='mm/dd/yy'
          value={this.state.eventDate}
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='location'
          placeholder='Event Location'
          value={this.state.location}
          onChange={this.handleChange}
        />
        <button type='submit'>{buttonText}</button>
        </form>
      </div>
    );
  }
}

EventForm.propTypes = {
  onComplete: PropTypes.func,
  event: PropTypes.object,
};

export default EventForm;
