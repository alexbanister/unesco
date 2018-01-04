/* eslint no-unused-vars: 0 */

import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='header__nav'>
      <ul className='header__nav__list'>
        <li className='header__nav__list__item'>
          <Link to='/dashboard'>dashboard</Link>
        </li>
        <li className='header__nav__list'>
          <Link to='/favorites'>favorites</Link>
        </li>
        <li className='header__nav__list'>
          <Link to='/visited'>visited</Link>
        </li>
        <li className='header__nav__list'>
          <Link to='/wants'>want to go</Link>
        </li>
        <li className='header__nav__list'>
          <Link to='/profile'>profile</Link>
        </li>
      </ul>
    </nav>
  );
};

Header.propTypes = {};

export default Header;
