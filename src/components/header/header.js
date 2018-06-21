import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import * as routes from '../../utils/routes';
import './header.scss';
import logo from '../../assets/GroupUpLogo.png';

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
        <Link to={routes.LANDING}><li onClick={this.props.doLogout}>Log out</li></Link>
      </ul>;

    return (
      <header className='header'>
        <nav>
          <Link to={routes.LANDING}>
            <img src={logo} alt='group up'/>
            <h1>GroupUp</h1>
          </Link>
          { this.props.loggedIn ? loggedInJSX : guestJSX }
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  doLogout: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  doLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
