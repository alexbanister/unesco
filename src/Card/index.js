import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import heritageImage from 'world-heritage-image';
import commons from 'commons-photo-url';
import {
  removeFlag,
  addFlag
} from './actions';

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

  async componentWillMount() {
    const url = await heritageImage(this.props.site.id)
      .then((img) => {
        if (img) {
          return commons(img, commons.sizes.medium);
        }
        return `${process.env.PUBLIC_URL}/images/no-image.png`;
      })
      .then(img => img);
    this.setState({
      heroStyle: {
        backgroundImage: `url(${url})`
      }
    });
  }

  setIcon(flagType, id) {
    if (this.props.user[flagType].includes(id)) {
      return (
        <div
          className={`${flagType}-on tooltip`}
          onClick={() => this.removeFlag(flagType, id)}>
          <span className="tooltiptext">{this.state[`${flagType}OnText`]}</span>
        </div>
      );
    }
    return (
      <div
        className={`${flagType} tooltip`}
        onClick={() => this.addFlag(flagType, id)}>
        <span className="tooltiptext">{this.state[`${flagType}Text`]}</span>
      </div>
    );
  }

  removeFlag(flagType, id) {
    this.props.removeFlag({ flagType, id });
  }

  addFlag(flagType, id) {
    this.props.addFlag({ flagType, id });
  }

  render() {
    return (
      <article className="site-card">
        <div style={ this.state.heroStyle } className="hero"></div>
        <h3>{this.props.site.name.replace(/<[^>]+>/g, '')}</h3>
        <p>{this.props.site.description.replace(/<[^>]+>/g, '')}</p>
        <Link to="">...More</Link>
        <div className="icons">
          {this.setIcon('favorites', this.props.site.id)}
          {this.setIcon('visited', this.props.site.id)}
          {this.setIcon('wants', this.props.site.id)}
        </div>
      </article>
    );
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
