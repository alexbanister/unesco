import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../Header/';

class Profile extends Component {
  render() {
    return (
      <div>
        <p>Profile</p>
        <Header />
      </div>
    );
  }
}

Profile.propTypes = {};

const mapStateToProps = store => ({
  store
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));