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
import './auth-landing.scss';
import logoLarge from '../../assets/logo-large.png';

class AuthLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
    autobind.call(this, AuthLanding);
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.fetchPublicEvents()
        .catch(() => this.setState({ error: true }));
    }
  }

  handleLogin(user) {
    return this.props.doLogin(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD);
      })
      .catch(() => this.setState({ error: true }));
  }

  handleSignup(user) {
    return this.props.doSignup(user)
      .then(() => {
        this.props.history.push(routes.CREATE_PROFILE);
      })
      .catch(() => this.setState({ error: true }));
  }

  render() {
    const landingJSX =
      <div>
        <div className='welcome-box'>
          <img src={logoLarge}/>
          <div className='welcome-aside'>
            <h1>Welcome to GroupUp!</h1>
            <h3><Link className='signup-link' to={routes.SIGNUP}>SIGN UP</Link> to begin making your own events</h3>
          </div>
        </div>
        <h1>Public events</h1>
        { this.state.error && <h3 className='error'>Could not fetch public events</h3> }
        <div className='public-events'>
        {
          this.props.publicEvents.length > 0 ?
          this.props.publicEvents.map(event => <EventItem event={event} key={event._id}/>) :
            <p>No events to display</p>
        }
        </div>
      </div>;

    const signupJSX =
      <div>
        <h2>Create an Account</h2>
        { this.state.error && <h3 className='error'>Sign up error. Please try again.</h3> }
        <AuthForm onComplete={this.handleSignup} type='signup'/>
        <p>Already have one?</p>
        <Link className='button-mock' to={routes.LOGIN}>Log in</Link>
        <a className='button-mock' href={GOOGLE_LOGIN_REDIRECT}>Sign in with Google</a>
      </div>;

    const loginJSX =
      <div>
        <h2>Log in</h2>
        { this.state.error && <h3 className='error'>Error. Please confirm your username and password and try again.</h3> }
        <AuthForm onComplete={this.handleLogin} type='login'/>
        <p>{ CREATE_ACCOUNT }</p>
        <Link className='button-mock' to={routes.SIGNUP}>Sign up</Link>
        <a className='button-mock' href={GOOGLE_LOGIN_REDIRECT}>Sign in with Google</a>
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
  publicEvents: PropTypes.array,
  loggedIn: PropTypes.bool,
  fetchPublicEvents: PropTypes.func,
};

const mapStateToProps = state => ({
  publicEvents: state.publicEvents,
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  doSignup: user => dispatch(authActions.signupRequest(user)),
  doLogin: user => dispatch(authActions.loginRequest(user)),
  fetchPublicEvents: () => dispatch(eventActions.getPublicEventsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLanding);
