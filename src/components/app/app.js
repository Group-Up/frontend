import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../header/header';
import AuthRedirect from '../auth-redirect/auth-redirect';

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
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.token,
  // other things
});

const mapDispatchToProps = dispatch => ({
  // functions
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
