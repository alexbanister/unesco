/* eslint no-unused-vars: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, match } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { removeFlag, addFlag } from '../Card/actions';
import { addFlagFetch, removeFlagFetch } from '../API/';

const SiteDetails = () => {
  const setHeroImage = () => {
    const img = this.props.site.image ?
      `url(${this.props.site.image})` :
      `url(${process.env.PUBLIC_URL}/images/no-image.png)`;

    this.setState({
      heroStyle: {
        backgroundImage: img
      }
    });
  };

  const setIcon = (flagType, siteId, userId) => {
    if (this.props.user[flagType].includes(siteId)) {
      return (
        <div
          className={`${flagType}-on tooltip`}
          onClick={() => this.flagOff(flagType, siteId, userId)}>
          <span className="tooltiptext">{this.state[`${flagType}OnText`]}</span>
        </div>
      );
    }
    return (
      <div
        className={`${flagType} tooltip`}
        onClick={() => this.flagOn(flagType, siteId, userId)}>
        <span className="tooltiptext">{this.state[`${flagType}Text`]}</span>
      </div>
    );
  };

  // flagOff(flagType, id, userId) {
  //   removeFlagFetch(flagType, id, userId);
  //   this.props.removeFlag({ flagType, id });
  // }
  //
  // flagOn(flagType, id, userId) {
  //   addFlagFetch(flagType, id, userId);
  //   this.props.addFlag({ flagType, id });
  // }

  return (
    <section className='site-details'>

    </section>
  );
};

SiteDetails.propTypes = {};

const mapStateToProps = store => ({
  user: store.user,
  site: store.sites.find(site => site.id === parseInt(match.params.id, 10))
});

const mapDispatchToProps = dispatch => ({
  removeFlag: fav => (dispatch(removeFlag(fav))),
  addFlag: fav => (dispatch(addFlag(fav)))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteDetails));
