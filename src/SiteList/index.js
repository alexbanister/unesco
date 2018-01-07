import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../Header/';
import Card from '../Card/';

class SiteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteIds: []
    };
  }

  displayCards(siteIds) {
    return siteIds.map((id) => {
      const siteObj = this.props.sites.find(site => site.id === id);
      return <Card site={siteObj} key={siteObj.id}/>;
    });
  }

  render() {
    const sites = this.props.user[this.props.section] ?
      this.displayCards(this.props.user[this.props.section]) :
      [];
    return (
      <div className='site-list'>
        <Header title={this.props.title}/>
        <section className='site-list__content'>
          {sites}
        </section>
      </div>
    );
  }
}

SiteList.propTypes = {};

const mapStateToProps = store => ({
  user: store.user,
  sites: store.sites
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteList));
