import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as routes from '../../utils/routes';

class Header extends React.Component {
  render() {
    const guestJSX =
      <ul>
        <Link to={routes.LANDING}><li>Home</li></Link>
        <Link to={routes.LOGIN}><li>Log in</li></Link>
        <Link to={routes.SIGNUP}><li>Sign up</li></Link>
      </ul>;

    const loggedInJSX =
      <ul>
        <Link to={routes.DASHBOARD}><li>Dashboard</li></Link>
        <Link to={routes.SIGNUP}><li>Sign up</li></Link>
        <li onClick={this.props.logout}>Log out</li>
      </ul>;

    return (
      <header className='header'>
        <nav>
          { this.props.loggedIn ? loggedInJSX : guestJSX }
        </nav>
        <h1>GroupUp</h1>
      </header>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  logout: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  // logout: () => dispatch(ACTIONS.logout()),
});

// export default connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header;
