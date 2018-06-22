import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Favicon from 'react-favicon';
import Header from '../header/header';
import Footer from '../footer/footer';
import Dashboard from '../dashboard/dashboard';
import AuthRedirect from '../auth-redirect/auth-redirect';
import AuthLanding from '../auth-landing/auth-landing';
import * as profileActions from '../../actions/profile';
import Profile from '../profile/profile';
import EventPage from '../event-page/event-page';
import * as eventActions from '../../actions/event';
import { FAVICON } from '../../utils/constants';
import '../../style/main.scss';

class App extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.pFetchUserProfile()
        .catch(console.error);
    } else {
      this.props.pFetchPublicEvents();
    }
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <div className='main-app'>
            <Favicon url={FAVICON}/>
            <Header/>
            <Route path='*' component={AuthRedirect}/>
            <Route exact path='/' component={AuthLanding}/>
            <Route exact path='/login' component={AuthLanding}/>
            <Route exact path='/signup' component={AuthLanding}/>
            <Route exact path='/profile/create' component={Profile}/>
            <Route exact path='/dashboard' component={Dashboard}/>
            <Route path='/events' component={EventPage}/>
            <Footer/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool,
  pFetchUserProfile: PropTypes.func,
  pFetchPublicEvents: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  pFetchUserProfile: () => dispatch(profileActions.profileFetchRequest()),
  pFetchPublicEvents: () => dispatch(eventActions.getPublicEventsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
