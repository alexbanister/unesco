/* eslint no-unused-vars: 0 */
/* eslint prefer-destrucuring: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import fire from '../utils/fire';
import { loginAction, logoutAction } from './actions';
import { loginToServer } from '../API/';

class Welcome extends Component {
  componentWillMount() {
    this.checkUserLoginStatus();
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
      <main className='welcome'>
        <div className='welcome__cover'>
          <section className='welcome__content'>
            <article className='welcome__logo__container'>
              <img
                className='welcome__logo__img'
                // eslint-disable-next-line
                src={require('../assets/icons/traveler-logo.svg')}
                alt='unesco traveler logo' />
            </article>
            <article className='welcome__text__container'>
              <p className='welcome__text'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo conse</p>
            </article>
            <article className='welcome__button__container'>
              <button
                className='welcome__button__google'
                onClick={() => this.continueLogin('google')}>
                Continue With Google
              </button>
              <button
                className='welcome__button__twitter'
                onClick={() => this.continueLogin('twitter')}>
                Continue With Twitter
              </button>
              <button
                className='welcome__button__facebook'
                onClick={() => this.continueLogin('facebook')}>
                Continue With Facebook
              </button>
            </article>
          </section>
        </div>
      </main>
    );
  }
}

Welcome.propTypes = {};

const mapStateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch => ({
  loginAction: user => (dispatch(loginAction(user)))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Welcome));
