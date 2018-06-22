import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import autobind from '../../utils/autobind';
import './auth-form.scss';

const defaultState = {
  username: '',
  usernameDirty: false,
  usernameError: 'Username is required',

  email: '',
  emailDirty: false,
  emailError: 'Email is required',

  password: '',
  passwordDirty: false,
  passwordError: 'Password is required',
};

const MIN_USERNAME_LENGTH = 1;
const MAX_USERNAME_LENGTH = 16;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 16;

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autobind.call(this, AuthForm);
  }

  handleValidation(name, value) {
    let errMessage = null;
    if (this.props.type === 'login') return null;
    switch (name) {
      case 'username':
        if (value.length < MIN_USERNAME_LENGTH || value.length > MAX_USERNAME_LENGTH) {
          errMessage = `Username must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters`;
        }
        break;
      case 'password':
        if (value.length < MIN_PASSWORD_LENGTH || value.length > MAX_PASSWORD_LENGTH) {
          errMessage = `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters`;
        } else if (!/[0-9]|[A-Z]|\W/.test(value)) {
          errMessage = 'Password must contain one or more of the following: ' +
            'numbers, uppercase letters, special characters';
        }
        break;
      case 'email':
        if (!validator.isEmail(value)) {
          errMessage = 'Invalid email';
        }
        break;
      default:
        break;
    }
    return this.setState({
      [`${name}Dirty`]: !(errMessage === null),
      [`${name}Error`]: errMessage,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { usernameError, passwordError, emailError } = this.state;
    if (this.props.type === 'login' || (!usernameError && !passwordError && !emailError)) {
      this.props.onComplete(this.state);
      this.setState(defaultState);
    } else {
      this.setState({
        usernameDirty: true,
        passwordDirty: true,
        emailDirty: true,
      });
    }
  }

  render() {
    const { type } = this.props;
    const emailInputJSX =
      <div>
        <input
          name='email'
          placeholder='email'
          type='email'
          value={this.state.email}
          onChange={this.handleChange}
          onBlur={() => this.handleValidation('email', this.state.email)}
        />
        { this.state.emailDirty && <p className='error'>{this.state.emailError}</p> }
      </div>;

    return (
      <form className='auth-form' onSubmit={this.handleSubmit} noValidate>
        { type === 'signup' && emailInputJSX }
        <input
          name='username'
          placeholder='username'
          type='text'
          value={this.state.username}
          onChange={this.handleChange}
          onBlur={() => this.handleValidation('username', this.state.username)}
        />
        { this.state.usernameDirty && <p className='error'>{this.state.usernameError}</p> }
        <input
          name='password'
          placeholder='password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
          onBlur={() => this.handleValidation('password', this.state.password)}
        />
        { this.state.passwordDirty && <p className='error'>{this.state.passwordError}</p> }
        <button type='submit'>{ type }</button>
      </form>
    );
  }
}

AuthForm.propTypes = {
  type: PropTypes.string,
  onComplete: PropTypes.func,
};

export default AuthForm;
