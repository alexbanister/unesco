/* eslint no-unused-vars: 0 */
/* eslint prefer-destrucuring: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import fire from '../utils/fire';
import { loginAction, logoutAction, addSites } from './actions';
import { loginToServer, getSites } from '../API/';

class Welcome extends Component {
  componentWillMount() {
    this.getAllSites();
    this.checkUserLoginStatus();
  }

  loadSites = () => {
    const sites = localStorage.getItem('UNESCO_sites');
    if (sites) {
      this.props.addSites(JSON.parse(sites));
      return true;
    }
    return false;
  }

  getAllSites = async () => {
    if (!this.loadSites()) {
      const sites = await getSites();
      this.props.addSites(sites.sites);
      localStorage.setItem('UNESCO_sites', JSON.stringify(sites.sites));
    }
  }

  checkUserLoginStatus = () => {
    fire.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        const login = await loginToServer({
          id: uid,
          email,
          name: displayName
        });
        this.props.loginAction(login);
        this.props.history.push('/dashboard');
      }
    });
  }

  continueLogin = (authSrc) => {
    // eslint-disable-next-line
    const currentUser = firebase.auth().currentUser;
    const provider = {
      google: new firebase.auth.GoogleAuthProvider(),
      facebook: new firebase.auth.FacebookAuthProvider(),
      twitter: new firebase.auth.TwitterAuthProvider()
    };

    if (!currentUser) {
      return firebase.auth().signInWithPopup(provider[authSrc])
        .then(async (response) => {
          const { uid, email, displayName } = response.user;
          const user = await loginToServer({
            id: uid,
            email,
            name: displayName
          });
          return user;
        })
        .then((res) => {
          this.props.loginAction(res);
          this.props.history.push('/dashboard');
        })
        .catch(error => error);
    }

    return currentUser.linkWithPopup(provider[authSrc])
      .catch(error => error);
  }

  render() {
    return (
      <div className='welcome'>
        <button onClick={this.handleLogOut}>log out</button>
        <button onClick={() => this.continueLogin('google')}>Continue With Google</button>
        <button onClick={() => this.continueLogin('facebook')}>Continue With Facebook</button>
        <button onClick={() => this.continueLogin('twitter')}>Continue With Twitter</button>
      </div>
    );
  }
}

Welcome.propTypes = {};

const mapStateToProps = store => ({
  user: store.user,
  sites: store.sites
});

const mapDispatchToProps = dispatch => ({
  loginAction: user => (dispatch(loginAction(user))),
  addSites: sites => (dispatch(addSites(sites)))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Welcome));
