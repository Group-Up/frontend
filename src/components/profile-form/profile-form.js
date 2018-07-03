import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autobind';
import './profile-form.scss';

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
    if (typeof value !== 'string') {
      this.setState({ bioError: 'Your bio only accepts text input' });
    } else {
      this.setState({ bioError: null });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
        <label>{this.props.profile ? 'Update Your Profile' : 'Add a short bio to create your profile'}</label>
        <textarea
          name='bio'
          placeholder='bio'
          value={this.state.bio}
          onChange={this.handleChange}
          onBlur={() => this.handleValidation('bio', this.state.bio)}
        />
        {this.state.bioDirty && <p>{this.state.bioError}</p>}
        <button type='submit'>{this.props.profile ? 'Update' : 'Create'} Profile </button>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  onComplete: PropTypes.func,
  profile: PropTypes.object,
};

export default ProfileForm;
