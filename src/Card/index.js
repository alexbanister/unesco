import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import heritageImage from 'world-heritage-image';
import commons from 'commons-photo-url';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ''
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

  render() {
    return (
      <article className="site-card">
        <div style={ this.state.heroStyle } className="hero"></div>
        <h3>{this.props.site.name.replace(/<[^>]+>/g, '')}</h3>
        <p>{this.props.site.description.replace(/<[^>]+>/g, '')}</p>
        <Link to="">...More</Link>
        <div className="icons">
          <div className="fav" style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/fav.svg`
          }}></div>
          <div className="visited" style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/visited.svg`
          }}></div>
          <div className="want" style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/want.svg`
          }}></div>
        </div>
      </article>
    );
  }
}

Card.propTypes = {};

export default withRouter(Card);
