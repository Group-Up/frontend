import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as routes from '../../utils/routes';

class AuthRedirect extends React.Component {
  render() {
    const { location, token } = this.props;
    const { pathname } = location;

    let destinationRoute = null;

    if (pathname === routes.LOGIN || pathname === routes.LANDING) {
      if (token) {
        destinationRoute = routes.DASHBOARD;
      }
    } else if (pathname === routes.SIGNUP) {
      if (token) {
        destinationRoute = routes.CREATE_PROFILE;
      }
    } else if (pathname === routes.EVENT) {
      if (token) {
        destinationRoute = routes.EVENT;
      }
    }
    else if (!token) {
      destinationRoute = routes.LANDING;
    }
    return (
      <div>
        { destinationRoute && <Redirect to={destinationRoute}/> }
      </div>
    );
  }
}

AuthRedirect.propTypes = {
  token: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps)(AuthRedirect);
