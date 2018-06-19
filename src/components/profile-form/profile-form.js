import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autobind';

const defaultState = {
  bio: '',
  bioDirty: false,
  bioError: 'Error with your how your bio is created',
};

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.profile ? props.profile : defaultState;
    autoBind.call(this, ProfileForm);
  }

  handleValidation(name, value) {
    switch (name) {
      case 'bio':
        if (value.type !== 'String') {
          return 'Your bio only accepts text input';
        }
        return null;
      default:
        return null;
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.handleValidation(name, value),
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.bioError) {
      this.setState({ bioDirty: true });
    } else {
      this.props.onComplete(this.state);
    }
  }

  render() {
    return (
      <form className='profile-form'
        onSubmit={this.handleSubmit}>
        <input
          name='bio'
          type='text'
          placeholder='bio'
          value={this.state.bio}
          onChange={this.handleChange}
        />
        {this.state.bioDirty ? <p>{this.state.bioError}</p> : undefined}

        <button type='submit'>{this.props.profile ? 'update' : 'create'} profile </button>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  onComplete: PropTypes.func,
  profile: PropTypes.object,
};

export default ProfileForm;
