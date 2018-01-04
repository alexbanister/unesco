import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../Header/';

class SiteList extends Component {
  render() {
    return (
      <div>
        <h3>favs</h3>
        <Header />
      </div>
    );
  }
}

SiteList.propTypes = {};

const mapStateToProps = store => ({
  store
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteList));