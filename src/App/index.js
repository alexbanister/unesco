import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Welcome from '../Welcome/';
import Dashboard from '../Dashboard/';
import SiteList from '../SiteList/';
import Profile from '../Profile/';

class App extends Component {
  render() {
    return (
      <div className="app">
        <main>
          <Route
            exact path='/'
            component={Welcome}
            key='Welcome'/>
          <Route
            exact path='/dashboard'
            component={Dashboard}
            key='Dashboard' />
          <Route
            exact path='/favorites'
            render={() => <SiteList title='Favorites' section='favorties'/>}
            key='Favorites' />
          <Route
            exact path='/visited'
            render={() => <SiteList title='Visited' section='visited' />}
            key='Visited' />
          <Route
            exact path='/wants'
            render={() => <SiteList title='Want To Go' section='wants' />}
            key='Wants' />
          <Route
            exact path='/profile'
            component={Profile}
            key='Profile' />
        </main>
      </div>
    );
  }
}

export default App;
