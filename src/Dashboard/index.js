import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../Header/';
import Card from '../Card/';

class Dashboard extends Component {
  getCounts = (type) => {
    if (this.props.user[type]) {
      return this.props.user[type].length;
    }
    return 0;
  }
  getRandomCard = () => {
    if (this.props.sites.length !== 0) {
      const RandomNum = Math.floor((Math.random() * this.props.sites.length) - 1);
      return <Card site={this.props.sites[RandomNum]} />;
    }
    return false;
  }

  displayCard(id) {
    if (this.props.sites.length > 0) {
      const cardSite = this.props.sites.find(site => site.id === parseInt(id));
      return <Card site={cardSite} />;
    }
    return false;
  }

  render() {
    return (
      <div>
        <Header />
        <div className='highlights'>
          <div className='callout'>
            <h3>Favorites</h3>
            <h2>{this.getCounts('favorites')}</h2>
          </div>
          <div className='callout'>
            <h3>Visited</h3>
            <h2>{this.getCounts('visited')}</h2>
          </div>
          <div className='callout'>
            <h3>Want to go</h3>
            <h2>{this.getCounts('wants')}</h2>
          </div>
        </div>
        <div className="main-container">
          {this.displayCard('1885')}
          {this.getRandomCard()}
          <div className="dashboard-search">
            search
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {};

const mapStateToProps = store => ({
  sites: store.sites,
  user: store.user
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
