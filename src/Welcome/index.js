import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import fire from '../utils/fire';

class Welcome extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
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
        const errorCode = error.code;
        const errorMessage = error.message;

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
      .then(() => {})
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

  continueWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((response) => {
        const { uid, email, displayName } = response.user;
        console.log(uid, email, displayName);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  continueWithFacebook = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((response) => {
        const { uid, email, displayName } = response.user;
        console.log(uid, email, displayName);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  continueWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((response) => {
        console.log(Object.keys(response.user));
        const { uid, email, displayName } = response.user;
        const { accessToken, secret } = response.credential;
        console.log(uid, email, displayName);
        console.log(accessToken, secret);
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

const mapStateToProps = (store) => {
  return {
    store
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Welcome));
