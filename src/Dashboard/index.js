import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../Header/';
import Card from '../Card/';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card1: {},
      card2: {}
    };
  }

  componentWillMount() {
    const RandomNum1 = Math.floor((Math.random() * this.props.sites.length) - 1);
    const RandomNum2 = Math.floor((Math.random() * this.props.sites.length) - 1);
    this.setState({
      card1: this.props.sites[RandomNum1],
      card2: this.props.sites[RandomNum2]
    });
  }

  getCounts = (type) => {
    if (this.props.user[type]) {
      return this.props.user[type].length;
    }
    return 0;
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
          <Card site={this.state.card1} />
          <Card site={this.state.card2} />
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
