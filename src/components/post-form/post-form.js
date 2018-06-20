import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from '../../utils/autobind';

const defaultState = {
  title: '',
  titleDirty: false,
  titleError: '',

  // imageUrl: '',

  description: '',
  descriptionDirty: false,
  descriptionError: '',
};

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.post ? this.props.post : defaultState;
    autobind.call(this, PostForm);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = this.props.selectedEvent._id;
    if (!this.state.titleError && !this.state.descriptionError) {
      if (this.props.type === 'announcement') {
        this.props.onComplete({ ...this.state, isAnnouncement: true }, id);
      } else {
        this.props.onComplete(this.state, id);
      }
    } else {
      this.setState({
        titleDirty: true,
        descriptionDirty: true,
      });
    }
  }

  handleValidation(name, value) {
    if (!value) {
      this.setState({
        [`${name}Dirty`]: true,
        [`${name}Error`]: `Must provide ${name}`,
      });
    }
  }

  render() {
    const { type } = this.props;
    const textPostJSX =
      <textarea
        placeholder='enter text here'
        name='description'
        onChange={this.handleChange}
        onBlur={() => this.handleValidation('description', this.state.description)}
        value={this.state.description}
      />;
    const photoPostJSX = <p>Photo JSX here</p>;
    const announcementJSX =
      <input
        type='text'
        name='description'
        placeholder='Description'
        onChange={this.handleChange}
        value={this.state.description}
      />;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          onChange={this.handleChange}
          onBlur={() => this.handleValidation('title', this.state.title)}
          value={this.state.title}
        />
        {this.state.titleDirty && <p>{ this.state.titleError }</p>}
        {type === 'text' && textPostJSX}
        {type === 'photo' && photoPostJSX}
        {type === 'announcement' && announcementJSX}
        {this.state.descriptionDirty && <p>{ this.state.descriptionError }</p>}
        <button type='submit'> Add </button>
      </form>
    );
  }
}

PostForm.propTypes = {
  type: PropTypes.string,
  post: PropTypes.object,
  onComplete: PropTypes.func,
  selectedEvent: PropTypes.object,
};

const mapStatetoProps = state => ({
  selectedEvent: state.selectedEvent,
});

export default connect(mapStatetoProps)(PostForm);
