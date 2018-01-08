import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import FlagIcons from '../FlagIcons/';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heroStyle: {}
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
        <Link to={`/site/${this.props.site.id}`}>...More</Link>
        <FlagIcons siteId={this.props.site.id} />
      </article>
    );
  }

  render() {
    return this.props.site ? this.drawCard() : this.drawLoading();
  }
}

Card.propTypes = {};

export default withRouter(Card);
