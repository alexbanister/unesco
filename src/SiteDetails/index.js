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
        <section className='site-details__content'>
          <div
            style={ this.state.heroStyle }
            className="hero"></div>
          <div className="site-name">
            <h2>{this.state.site.name.replace(/<[^>]+>/g, '')}</h2>
            {this.state.site.country_name}, {this.state.site.region}
          </div>
          <FlagIcons siteId={this.state.site.id} />
          <div className="specs">
            <div>
              <h4>Inscribed</h4>
            </div>
            <div>
              {this.state.site.inscribed}
            </div>
            <div>
              <h4>Category</h4>
            </div>
            <div>
              {this.state.site.category}
            </div>
            <div>
              <h4>Size</h4>
            </div>
            <div>
              {this.state.site.size}
            </div>
            <div>
              <h4>Latitude & Longitude</h4>
            </div>
            <div>
              {this.state.site.latitude}, {this.state.site.longitude}
            </div>
          </div>
          <div className="desc">
            <h3>Description</h3>
            <p dangerouslySetInnerHTML={{ __html: this.state.site.description }}></p>
          </div>
          <div className="justification">
            <h3>Justifaction</h3>
            <p dangerouslySetInnerHTML={{ __html: this.state.site.justification }}></p>
          </div>
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
