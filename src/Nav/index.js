/* eslint no-unused-vars: 0 */
import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='nav'>
      <ul className='nav__list'>
        <li className='nav__list__item'>
          <NavLink
            className='nav__link'
            activeClassName='nav-link--selected'
            to='/dashboard'>
            dashboard
          </NavLink>
        </li>
        <li className='nav__list__item'>
          <NavLink
            className ='nav__link'
            activeClassName='nav-link--selected'
            to='/favorites'>
            favorites
          </NavLink>
        </li>
        <li className='nav__list__item'>
          <NavLink
            className='nav__link'
            activeClassName='nav-link--selected'
            to='/visited'>
            visited
          </NavLink>
        </li>
        <li className='nav__list__item'>
          <NavLink
            className='nav__link wants'
            activeClassName='nav-link--selected'
            to='/wants'>
            want to go
          </NavLink>
        </li>
        <li className='nav__list__item'>
          <NavLink
            className='nav__link profile'
            activeClassName='nav-link--selected'
            to='/profile'>
            profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

Header.propTypes = {};

export default Header;
