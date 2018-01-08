/* eslint no-unused-vars: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { regions, countries } from '../Header/actions';
import { setSearch } from './actions';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      region: '',
      country: ''
    };
  }

  handleChange = (key, event) => {
    this.setState({
      [key]: event.target.value
    });
  }

  populateOptions = arr => (arr ? arr.map(item => <option key={`${item}`}>{item}</option>) : null);

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSearch('name', this.state.search.toLowerCase());
      this.props.history.push('/explore');
    }
  }

  handleSearch = (type, searchTerm) => {
    const { sites } = this.props;
    switch (type) {
    case 'country':
      const filteredCountries = sites.filter(site => site.country_name.includes(searchTerm));
      const idsByCountry = filteredCountries.reduce((accum, site) => {
        return [...accum, site.id];
      }, []);
      this.props.setSearch(idsByCountry);
      break;
    case 'region':
      const filteredRegions = sites.filter(site => site.region === searchTerm);
      const idsByRegion = filteredRegions.reduce((accum, site) => {
        return [...accum, site.id];
      }, []);
      this.props.setSearch(idsByRegion);
      break;
    default:
      const filteredNames = sites.filter(site => site.name.toLowerCase().includes(searchTerm));
      const idsByName = filteredNames.reduce((accum, site) => {
        return [...accum, site.id];
      }, []);
      this.props.setSearch(idsByName);
      break;
    }
  }

  render() {
    return (
      <div className="search">
        <h3>Search by Name</h3>
        <input
          type='text'
          placeholder='search'
          value={this.state.search}
          onChange={this.handleChange.bind(this, 'search')}
          onKeyDown={this.handleKeyPress}/>
        <h3>View By Region</h3>
        <select
          className='region__select'
          name='region'
          defaultValue='region'
          onChange={(event) => {
            this.setState({
              region: event.target.value
            }, () => {
              this.handleSearch('region', this.state.region);
              this.props.history.push('/explore');
            });
          }}>
          <option disabled value='region'>Region</option>
          {this.populateOptions(this.props.regions)}
        </select>
        <h3>View By Country</h3>
        <select
          className='country__select'
          name='country'
          defaultValue='country'
          onChange={(event) => {
            this.setState({
              region: event.target.value
            }, () => {
              this.handleSearch('country', this.state.region);
              this.props.history.push('/explore');
            });
          }}>
          <option disabled value='country'>Country</option>
          {this.populateOptions(this.props.countries)}
        </select>
      </div>
    );
  }
}

Search.propTypes = {};

const mapStateToProps = store => ({
  sites: store.sites,
  regions: store.regions,
  countries: store.countries
});

const mapDispatchToProps = dispatch => ({
  setSearch: sites => dispatch(setSearch(sites))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
