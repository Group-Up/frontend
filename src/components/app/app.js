import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../header/header';
import AuthRedirect from '../auth-redirect/auth-redirect';
import AuthLanding from '../auth-landing/auth-landing';
import ProfileForm from '../profile-form-mock/profile-form-mock'; // TODO: switch to correct
// profile form

class App extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      // get profile
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
            <Route exact path='/profile/create' component={ProfileForm}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
  // other things
});

const mapDispatchToProps = dispatch => ({
  // functions
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
