import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../header/header';

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
