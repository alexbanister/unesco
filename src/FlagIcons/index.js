import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { removeFlag, addFlag } from './actions';
import { addFlagFetch, removeFlagFetch } from '../API/';

class FlagIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesText: 'OMG! My Favorite',
      favoritesOnText: 'Not my Favorite',
      visitedText: 'Been there, Done That!',
      visitedOnText: 'Nope! Haven\'t been.',
      wantsText: 'I want to go!',
      wantsOnText: 'I don\'t want to go.'
    };
  }

  setIcon(flagType, siteId, userId) {
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
  }

  flagOff(flagType, id, userId) {
    removeFlagFetch(flagType, id, userId);
    this.props.removeFlag({ flagType, id });
  }

  flagOn(flagType, id, userId) {
    addFlagFetch(flagType, id, userId);
    this.props.addFlag({ flagType, id });
  }

  render() {
    return (
      <div className="icons">
        {this.setIcon('favorites', this.props.siteId, this.props.user.id)}
        {this.setIcon('visited', this.props.siteId, this.props.user.id)}
        {this.setIcon('wants', this.props.siteId, this.props.user.id)}
      </div>
    );
  }
}

FlagIcons.propTypes = {};

const mapStateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch => ({
  removeFlag: fav => (dispatch(removeFlag(fav))),
  addFlag: fav => (dispatch(addFlag(fav)))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FlagIcons));
