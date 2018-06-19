import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../header/header';
import Dashboard from '../dashboard/dashboard';
import AuthRedirect from '../auth-redirect/auth-redirect';
import AuthLanding from '../auth-landing/auth-landing';
import * as profileActions from '../../actions/profileAction';
import Profile from '../profile/profile';

class App extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.pFetchUserProfile()
        .catch(console.error);
      // get profile events?
    }
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <Header/>
            <Route path='*' component={AuthRedirect}/>
            <Route exact path='/' component={AuthLanding}/>
            <Route exact path='/login' component={AuthLanding}/>
            <Route exact path='/signup' component={AuthLanding}/>
            <Route exact path='/profiles' component={Profile}/>
            <Route exact path='/dashboard' component={Dashboard}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool,
  pFetchUserProfile: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
  // other things
});

const mapDispatchToProps = dispatch => ({
  pFetchUserProfile: () => dispatch(profileActions.profileFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
