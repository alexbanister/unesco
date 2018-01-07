import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../Header/';

class SiteList extends Component {
  render() {
    return (
      <div className='site-list'>
        <section className='header__container'>
          <Header title={this.props.title}/>
        </section>
        <section className='site-list__content'>
        </section>
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