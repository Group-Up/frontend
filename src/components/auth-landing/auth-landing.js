import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';
import autobind from '../../utils/autobind';
import AuthForm from '../auth-form/auth-form';
import * as routes from '../../utils/routes';
import { GOOGLE_LOGIN_REDIRECT, CREATE_ACCOUNT } from '../../utils/constants';

class AuthLanding extends React.Component {
  constructor(props) {
    super(props);
    autobind.call(this, AuthLanding);
  }

  handleLogin(user) {
    return this.props.doLogin(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD);
        // this.props.fetchProfile();
      })
      .catch(console.error);
  }

  handleSignup(user) {
    return this.props.doSignup(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD);
      })
      .catch(console.error);
  }

  render() {
    const landingJSX =
      <div>
        <p>Landing page text</p>
      </div>;

    const signupJSX =
      <div>
        <h2>Create an Account</h2>
        <AuthForm onComplete={this.handleSignup} type='signup'/>
        <p>Already have one?</p>
        <Link to={routes.LOGIN}>Log in</Link>
        <a href={GOOGLE_LOGIN_REDIRECT}>Sign in with Google</a>
      </div>;

    const loginJSX =
      <div>
        <h2>Log in</h2>
        <AuthForm onComplete={this.handleLogin} type='login'/>
        <p>{ CREATE_ACCOUNT }</p>
        <Link to={routes.SIGNUP}>Sign up</Link>
        <a href={GOOGLE_LOGIN_REDIRECT}>Sign in with Google</a>
      </div>;

    const { location } = this.props;

    return (
      <div className='landing'>
        {location.pathname === routes.LANDING && landingJSX}
        {location.pathname === routes.SIGNUP && signupJSX}
        {location.pathname === routes.LOGIN && loginJSX}
      </div>
    );
  }
}

AuthLanding.propTypes = {
  doLogin: PropTypes.func,
  doSignup: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  doSignup: user => dispatch(authActions.signupRequest(user)),
  doLogin: user => dispatch(authActions.loginRequest(user)),
});

export default connect(null, mapDispatchToProps)(AuthLanding);
