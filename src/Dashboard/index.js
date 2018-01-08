import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../Header/';
import Card from '../Card/';
import Search from '../Search';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfCards: 5,
      randomCards: []
    };
  }

  componentWillMount() {
    this.setState({
      randomCards: this.setRandomIndex()
    });
  }

  setRandomIndex() {
    let allCards = [];
    for (let i = 0; i < this.state.numOfCards; i++) {
      let index = this.getRandomIndex();
      while (this.state.randomCards.includes(index)) {
        index = this.getRandomIndex();
      }
      allCards = [...allCards, index];
    }
    return allCards;
  }

  getRandomIndex() {
    return Math.floor((Math.random() * this.props.sites.length) - 1);
  }

  getCounts = (type) => {
    if (this.props.user[type]) {
      return this.props.user[type].length;
    }
    return 0;
  }

  displayCards(cards) {
    if (this.props.sites.length > 0) {
      return cards.map((card) => {
        return <Card site={this.props.sites[card]} key={this.props.sites[card].id} />;
      });
    }
    return false;
  }

  render() {
    return (
      <div>
        <Header />
        <div className='highlights'>
          <div className='callout'>
            <h3>Favorites</h3>
            <h2>{this.getCounts('favorites')}</h2>
          </div>
          <div className='callout'>
            <h3>Visited</h3>
            <h2>{this.getCounts('visited')}</h2>
          </div>
          <div className='callout'>
            <h3>Want to go</h3>
            <h2>{this.getCounts('wants')}</h2>
          </div>
        </div>
        <div className="main-container">
          <Search />
          {this.displayCards(this.state.randomCards)}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {};

const mapStateToProps = store => ({
  sites: store.sites,
  user: store.user
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
