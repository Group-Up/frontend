import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as routes from '../../utils/routes';
import * as authActions from '../../actions/auth';
import * as eventActions from '../../actions/event';
import AuthForm from '../auth-form/auth-form';
import EventItem from '../event-item/event-item';
import { GOOGLE_LOGIN_REDIRECT, CREATE_ACCOUNT } from '../../utils/constants';
import autobind from '../../utils/autobind';

class AuthLanding extends React.Component {
  constructor(props) {
    super(props);
    autobind.call(this, AuthLanding);
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.fetchPublicEvents()
        .catch(console.error);
    }
  }

  handleLogin(user) {
    return this.props.doLogin(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD);
      })
      .catch(console.error);
  }

  handleSignup(user) {
    return this.props.doSignup(user)
      .then(() => {
        this.props.history.push(routes.CREATE_PROFILE);
      })
      .catch(console.error);
  }

  render() {
    const landingJSX =
      <div>
        <p>Recent events:</p>
        {
          this.props.events.length > 0 ?
          this.props.events.map(event => <EventItem event={event} key={event._id}/>) :
            <p>No events to display</p>
        }
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
  events: PropTypes.array,
  loggedIn: PropTypes.bool,
  fetchPublicEvents: PropTypes.func,
};

const mapStateToProps = state => ({
  events: state.events,
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  doSignup: user => dispatch(authActions.signupRequest(user)),
  doLogin: user => dispatch(authActions.loginRequest(user)),
  fetchPublicEvents: () => dispatch(eventActions.getPublicEventsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLanding);
