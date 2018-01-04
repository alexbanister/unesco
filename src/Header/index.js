import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Nav from '../Nav/';

const Header = () => {
  return (
    <header>
      <img src="" alt="" />
      <Nav />
    </header>
  );
};

Header.propTypes = {};

export default Header;
