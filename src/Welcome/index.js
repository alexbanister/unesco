/* eslint no-unused-vars: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import fire from '../utils/fire';
import { loginAction, logoutAction } from './actions';

class Welcome extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  componentDidMount() {
    this.checkUserLoginStatus();
  }

  checkUserLoginStatus = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.loginAction(user.uid);
      }
    });
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    fire.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const { errorCode, errorMessage } = error;
        console.log(errorCode, errorMessage);
      });

    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('LOGged IN');
        console.log('user uid: ', user.uid);
      } else {
        this.handleLogOut();
      }
    });
  };

  handleLogOut = () => {
    firebase.auth().signOut()
      .then(() => this.props.logoutAction())
      .catch((error) => {
        console.log('error: ', error);
      });
  }

  handleSignUp = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    fire.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log('error code: ', errorCode);
        console.log('error message: ', errorMessage);
      });

    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user uid: ', user.uid);
      } else {
        console.log('no user signup');
      }
    });
  };

  generateFetchPostPayload = body => ({
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body
  });

  addUserToDatabase = (id, email, name) => {
    const postBody = { id, email, name };
    const postPayload = this.generateFetchPostPayload(postBody);

    fetch('/api/v1/users', postPayload)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch((error) => { throw error; });
  }

  continueWithGoogle = () => {
    const { currentUser } = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    if (!currentUser) {
      return firebase.auth().signInWithPopup(provider)
        .then((response) => {
          const { uid, email, displayName } = response.user;
          this.props.loginAction(uid);
          fetch(`/api/v1/users/${uid}`)
            .then((res) => {
              if (res.ok) { return null; }
              return res;
            })
            .then(res => console.log(res))
            .catch((error) => { throw error; });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return currentUser.linkWithPopup(provider)
      .then((result) => {
        const { credential, user } = result;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  continueWithFacebook = () => {
    const { currentUser } = firebase.auth();
    const provider = new firebase.auth.FacebookAuthProvider();

    if (!currentUser) {
      return firebase.auth().signInWithPopup(provider)
        .then((response) => {
          const { uid, email, displayName } = response.user;
          this.props.loginAction(uid);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return currentUser.linkWithPopup(provider)
      .then((result) => {
        const { credential, user } = result;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  continueWithTwitter = () => {
    const { currentUser } = firebase.auth();
    const provider = new firebase.auth.TwitterAuthProvider();

    if (!currentUser) {
      return firebase.auth().signInWithPopup(provider)
        .then((response) => {
          const { uid, email, displayName } = response.user;
          this.props.loginAction(uid);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return currentUser.linkWithPopup(provider)
      .then((result) => {
        const { credential, user } = result;
        console.log(credential, user);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className='welcome'>
        {/* <form>
          <input
            type='text'
            placeholder='first name'
            onChange={this.handleChange.bind(this, 'firstName')} />
          <input
            type='text'
            placeholder='last name'
            onChange={this.handleChange.bind(this, 'lastName')} />
          <input
            type='email'
            placeholder='email'
            onChange={this.handleChange.bind(this, 'email')} />
          <input
            type='password'
            placeholder='password'
            onChange={this.handleChange.bind(this, 'password')} />
        </form> */}
        {/* <button onClick={this.handleLogin}>log in</button>
        <button onClick={this.handleSignUp}>sign up</button> */}
        <button onClick={this.handleLogOut}>log out</button>
        <button onClick={this.continueWithGoogle}>Continue With Google</button>
        <button onClick={this.continueWithFacebook}>Continue With Facebook</button>
        <button onClick={this.continueWithTwitter}>Continue With Twitter</button>
      </div>
    );
  }
}

Welcome.propTypes = {};

const mapStateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch => ({
  loginAction: user => (dispatch(loginAction(user))),
  logoutAction: user => (dispatch(logoutAction()))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Welcome));
