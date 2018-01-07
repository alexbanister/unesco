import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { removeFlag, addFlag } from './actions';
import { addFlagFetch, removeFlagFetch } from '../API/';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heroStyle: {},
      favoritesText: 'OMG! My Favorite',
      favoritesOnText: 'Not my Favorite',
      visitedText: 'Been there, Done That!',
      visitedOnText: 'Nope! Haven\'t been.',
      wantsText: 'I want to go!',
      wantsOnText: 'I don\'t want to go.'
    };
  }

  setHeroImage() {
    if (this.state.heroStyle.backgroundImage) {
      return;
    }

    const img = this.props.site.image ?
      `url(${this.props.site.image})` :
      `url(${process.env.PUBLIC_URL}/images/no-image.png)`;

    this.setState({
      heroStyle: {
        backgroundImage: img
      }
    });
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

  drawLoading() {
    return (
      <article className="site-card">
        <div className="loading">
          <img
            src={`${process.env.PUBLIC_URL}/images/loading.gif`}
            alt="Loading" />
        </div>
      </article>
    );
  }

  drawCard() {
    this.setHeroImage();
    return (
      <article className="site-card">
        <div
          style={ this.state.heroStyle }
          className="hero"></div>
        <h3>{this.props.site.name.replace(/<[^>]+>/g, '')}</h3>
        <p>{this.props.site.description.replace(/<[^>]+>/g, '')}</p>
        <Link to="">...More</Link>
        <div className="icons">
          {this.setIcon('favorites', this.props.site.id, this.props.user.id)}
          {this.setIcon('visited', this.props.site.id, this.props.user.id)}
          {this.setIcon('wants', this.props.site.id, this.props.user.id)}
        </div>
      </article>
    );
  }

  render() {
    return this.props.site ? this.drawCard() : this.drawLoading();
  }
}

Card.propTypes = {};

const mapStateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch => ({
  removeFlag: fav => (dispatch(removeFlag(fav))),
  addFlag: fav => (dispatch(addFlag(fav)))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Card));
