/* eslint no-unused-vars: 0 */

import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

const Header = ({ site }) => {
  return (
    <article className="site-card">
      {site.name}
    </article>
  );
};

Header.propTypes = {};

export default Header;
