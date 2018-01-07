/* eslint no-unused-vars: 0 */
/* eslint global-require: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { log } from 'util';
import { logoutAction, addSites } from '../Welcome/actions';
import { setRegions, setCountries } from './actions';
import Nav from '../Nav/';
import Search from '../Search';
import { getSites } from '../API/';

class Header extends Component {
  componentWillMount() {
    if (!this.props.user.id) {
      this.props.history.push('/');
    } else {
      this.getAllSites();
      if (!this.props.regions) {
        this.setCountryAndRegionLists();
      }
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

  setCountryAndRegionLists = () => {
    const { sites } = this.props;
    const regionList = sites.reduce((acc, site) => {
      if (!acc.includes(site.region)) {
        acc.push(site.region);
      }
      return acc;
    }, []);

    const countryList = sites.reduce((acc, site) => {
      if (!acc.includes(site.country_name)) {
        acc.push(site.country_name);
      }
      return acc;
    }, []);

    this.props.setRegions(regionList);
    this.props.setCountries(countryList);
  }

  render() {
    return (
      <header className='header'>
        <img className='header__logo'src={require('../assets/icons/traveler-logo.svg')} alt="traveler logo" />
        <section className='nav__container'>
          <Nav title={this.props.title}/>
          <Search />
        </section>
        <button onClick={() => {
          firebase.auth().signOut()
            .then(() => {
              this.props.logoutAction();
              this.props.history.push('/');
            })
            .catch(error => error);
        }}>
          log out
        </button>
      </header>
    );
  }
}

Header.propTypes = {};

const mapStateToProps = store => ({
  user: store.user,
  sites: store.sites,
  regions: store.regions,
  countries: store.countries
});

const mapDispatchToProps = dispatch => ({
  logoutAction: user => (dispatch(logoutAction())),
  addSites: sites => (dispatch(addSites(sites))),
  setRegions: regions => dispatch(setRegions(regions)),
  setCountries: countries => dispatch(setCountries(countries))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
