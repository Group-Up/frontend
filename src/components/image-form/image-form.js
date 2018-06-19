import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autobind';

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

      this.setState({
        image: files[0],
      }, () => {
        console.log('This will print after the state has been changed');
      });
    } else {
      this.setState({
        caption: value,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);

    this.setState(this.emptyState);
  }

  render() {
    return (
      <form className='image-form' onSubmit={this.handleSubmit}>
        <img src={this.state.preview} />
        <label>Image</label>
        <input
          type='file'
          name='photo'
          onChange={this.handleChange}
        />
        <label>Caption</label>
        <input
          type='text'
          name='caption'
          value={this.state.caption}
          onChange={this.handleChange}
        />
        <button type='submit'>Upload an Image!</button>
      </form>
    );
  }
}

ImageForm.propTypes = {
  onComplete: PropTypes.func,
};


export default ImageForm;
