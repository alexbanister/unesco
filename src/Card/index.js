import React, { Component } from 'react';
// import PropTypes from 'prop-types';
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
        return 'no-image.png';
      })
      .then(img => img);
    this.setState({ img: url });
  }

  render() {
    return (
      <article className="site-card">
        {this.props.site.name}
        <img src={this.state.img} alt="hi" />;
      </article>
    );
  }
}

Card.propTypes = {};

export default Card;
