import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autobind';
import './image-form.scss';

const GU_003 = 'File Required';

const fileToBase64String = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error(GU_003));
    }
    const reader = new FileReader();

    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', reject);

    return reader.readAsDataURL(file);
  });
};

class ImageForm extends React.Component {
  constructor(props) {
    super(props);

    this.emptyState = {
      preview: undefined,
      image: '', // base64 representation of the image we'll upload.
      caption: '',
    };

    this.state = this.emptyState;

    autoBind.call(this, ImageForm);
  }

  handleChange(event) {
    const { type, value, files } = event.target;

    if (type === 'file') {
      fileToBase64String(files[0])
        .then(preview => this.setState({ preview }));
      this.setState({ image: files[0] });
    } else {
      this.setState({
        caption: value,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.showCaption) {
      this.props.onComplete(this.state, this.props.event._id);
    } else {
      this.props.onComplete(this.props.profile, this.state); 
    }
    this.setState(this.emptyState);
  }

  render() {
    const showHide = this.props.showCaption ? 'post-image-caption' : 'profile-image';
    return (
      <form className='image-form' onSubmit={this.handleSubmit}>
        <img src={this.state.preview} />
        <label>Image</label>
        <input
          type='file'
          name='photo'
          onChange={this.handleChange}
        />
        <div className={showHide}>
          <label>Caption</label>
          <input
            type='text'
            name='caption'
            value={this.state.caption}
            onChange={this.handleChange}
          />
        </div>
        <button type='submit'>{ this.props.showCaption ? 'Upload an Image!' : 'Change Image' }</button>
      </form>
    );
  }
}

ImageForm.propTypes = {
  profile: PropTypes.object,
  showCaption: PropTypes.bool,
  onComplete: PropTypes.func,
  event: PropTypes.object,
};


export default ImageForm;
