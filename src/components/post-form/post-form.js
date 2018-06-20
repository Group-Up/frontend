import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from '../../utils/autobind';
import ImageForm from '../image-form/image-form';
import * as imageActions from '../../actions/image';

const defaultState = {
  title: '',
  titleDirty: false,
  titleError: '',
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
        this.props.onComplete({ ...this.state, isAnnouncement: true, type: this.props.type }, id);
        this.setState(defaultState);
      } else if (this.props.type === 'photo') {
        this.props.onComplete({ ...this.state, imageUrl: '' });
      } else {
        this.props.onComplete({ ...this.state, type: this.props.type }, id);
        this.setState(defaultState);
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
    const buttonText = this.props.post ? 'Update' : 'Add';
    const nonImagePostJSX = <form onSubmit={this.handleSubmit}>
    <input
      type='text'
      name='title'
      placeholder='Title'
      onChange={this.handleChange}
      onBlur={() => this.handleValidation('title', this.state.title)}
      value={this.state.title}
    />
    {this.state.titleDirty && <p>{ this.state.titleError }</p>}
    <textarea
        placeholder='enter text here'
        name='description'
        onChange={this.handleChange}
        onBlur={() => this.handleValidation('description', this.state.description)}
        value={this.state.description}
      />;
    {this.state.descriptionDirty && <p>{ this.state.descriptionError }</p>}
    <button type='submit'> {buttonText} </button>
  </form>;
    return (
      <div>
        { type === 'photo' 
        ? 
        <ImageForm event={this.props.selectedEvent} onComplete={this.props.pPostImageRequest}/> 
        : 
        nonImagePostJSX }
      </div>
    );
  }
}

PostForm.propTypes = {
  type: PropTypes.string,
  post: PropTypes.object,
  onComplete: PropTypes.func,
  selectedEvent: PropTypes.object,
  pPostImageRequest: PropTypes.func,
};

const mapStatetoProps = state => ({
  selectedEvent: state.selectedEvent,
});

const mapDispatchToProps = dispatch => ({
  pPostImageRequest: (image, event) => dispatch(imageActions.createRequest(image, event)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(PostForm);
