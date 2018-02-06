/*
* @component Routes
* @type Pure Component
* @children Errorhandler,Switch,Route,AsyncComponentLoader
* @requires React,Route, Switch, withRouter,
* @reduxActions false
* @actions none
* @description
* this is the core router component which will enable the routing
* in the application. we are using async component loading to load
* the components. meaning every component here will have a seperate file
* webpack will take care of the dependency management.
* we define our routes here in this component
*/

import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import ErrorHandler from './ErrorHandler';

import AsyncComponentLoader from './AsyncComponentLoader';

import './styles.scss';

// dynamic component loading. will create a seperate bundle for each component
// saves bundle huge sizes
const HomeComponent = AsyncComponentLoader(() => import(/* webpackChunkName: 'home' */ './Home'));
const EventsComponent = AsyncComponentLoader(() => import(/* webpackChunkName: 'events' */ './Events'));

const Routes = () => (
  <article className="routes_wrapper">
    <ErrorHandler>
      <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route exact path="/events" component={EventsComponent} />
      </Switch>
    </ErrorHandler>
  </article>
);

export default withRouter(Routes);
