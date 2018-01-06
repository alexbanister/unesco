/* eslint no-unused-vars: 0 */
/* eslint global-require: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { logoutAction, addSites } from '../Welcome/actions';
import Nav from '../Nav/';
import { getSites } from '../API/';

class Header extends Component {
  componentWillMount() {
    if (!this.props.user.id) {
      this.props.history.push('/');
    } else {
      this.getAllSites();
    }
  }

  loadSites = () => {
    const sites = localStorage.getItem('UNESCO_sites');
    if (sites) {
      this.props.addSites(JSON.parse(sites));
      return true;
    }
    return false;
  }

  getAllSites = async () => {
    if (!this.loadSites()) {
      const sites = await getSites();
      this.props.addSites(sites.sites);
      localStorage.setItem('UNESCO_sites', JSON.stringify(sites.sites));
    }
  }

  getBackground() {
    const imgNum = Math.floor((Math.random() * 13) + 1);
    return { backgroundImage: `url(${process.env.PUBLIC_URL}/images/backgrounds/${imgNum}.jpg)` };
  }

  render() {
    return (
      <header className='header' style={this.getBackground()}>
        <div className="header__cover">
          <img className='header__logo' src={require('../assets/icons/traveler-logo.svg')} alt="traveler logo" />
          <section className='nav__container'>
            <Nav title={this.props.title}/>
          </section>
        </div>
      </header>
    );
  }
}

Header.propTypes = {};

const mapStateToProps = store => ({
  user: store.user,
  sites: store.sites
});

const mapDispatchToProps = dispatch => ({
  logoutAction: user => (dispatch(logoutAction())),
  addSites: sites => (dispatch(addSites(sites)))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
