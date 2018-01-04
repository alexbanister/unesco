/* eslint no-unused-vars: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { logoutAction } from '../Welcome/actions';
import Nav from '../Nav/';

class Header extends Component {
  componentWillMount() {
    if (!this.props.user.id) {
      this.props.history.push('/');
    }
  }
  render() {
    return (
      <header>
        <img src="" alt="" />
        <Nav />
        <button onClick={() => {
          firebase.auth().signOut()
            .then(() => {
              this.props.logoutAction();
              this.props.history.push('/');
            })
            .catch(error => error);
        }}>
          log out
        </button>
      </header>
    );
  }
}

Header.propTypes = {};

const mapStateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch => ({
  logoutAction: user => (dispatch(logoutAction()))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
