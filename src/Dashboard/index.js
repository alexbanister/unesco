import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../Header/';
import Nav from '../Nav/';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div>DASHBOARD</div>
        <Header />
      </div>
    );
  }
}

Dashboard.propTypes = {};

const mapStateToProps = store => ({
  store
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));