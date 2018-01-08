import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Header/';
import FlagIcons from '../FlagIcons/';

class SiteDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heroStyle: {},
      site: {}
    };
  }

  componentDidMount() {
    const thisSite = this.props.sites.find((site) => {
      return site.id === parseInt(this.props.match.params.id, 10);
    });
    this.setState({
      site: thisSite
    });
  }

  setHeroImage() {
    if (this.state.heroStyle.backgroundImage) {
      return;
    }

    const img = this.state.site.image ?
      `url(${this.state.site.image})` :
      `url(${process.env.PUBLIC_URL}/images/no-image.png)`;

    this.setState({
      heroStyle: {
        backgroundImage: img
      }
    });
  }

  drawLoading() {
    return (
      <article className="site-details">
        <Header />
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
      <article className="site-details">
        <Header />
        <section className='site-list__content'>
          <div
            style={ this.state.heroStyle }
            className="hero"></div>
          <h3>{this.state.site.name.replace(/<[^>]+>/g, '')}</h3>
          <p>{this.state.site.description.replace(/<[^>]+>/g, '')}</p>
          <FlagIcons siteId={this.state.site.id} />
        </section>
      </article>
    );
  }

  render() {
    return this.state.site.id ? this.drawCard() : this.drawLoading();
  }
}

SiteDetails.propTypes = {};

const mapStateToProps = store => ({
  sites: store.sites
});

export default withRouter(connect(mapStateToProps, null)(SiteDetails));
