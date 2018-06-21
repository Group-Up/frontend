import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autobind';
import './event-form.scss';

const defaultState = {
  title: '',
  description: '',
  eventDate: '',
  location: '',
  isPublic: false,
};

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.event ? this.props.event : defaultState;
    autoBind.call(this, EventForm);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    if (this.props.event) {
      this.props.onComplete({ ...this.state, _id: this.props.event._id });
    } else {
      this.props.onComplete(this.state);
    }
    this.setState(this.props.event ? this.state : this.defaultState);
  }

  handleToggle() {
    this.setState({ isPublic: !this.state.isPublic });
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
            className='public'
            type='text'
            name='location'
            placeholder='Event Location'
            value={this.state.location}
            onChange={this.handleChange}
          />
          <input
            className='checkbox'
            type='checkbox'
            checked={this.state.isPublic}
            onChange={this.handleToggle}
          />
          <label>PUBLIC</label>
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
