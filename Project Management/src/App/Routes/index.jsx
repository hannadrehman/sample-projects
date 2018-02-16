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
import PropTypes from 'prop-types';

import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ErrorHandler from './ErrorHandler';
import AsyncComponentLoader from './AsyncComponentLoader';

import './styles.scss';

// dynamic component loading. will create a seperate bundle for each component
// code spliting
const HomeComponent = AsyncComponentLoader(() => import(/* webpackChunkName: 'home' */ './Home'));
const ProjectComponent = AsyncComponentLoader(() => import(/* webpackChunkName: 'project' */ './Project'));
const LoginComponent = AsyncComponentLoader(() => import(/* webpackChunkName: 'events' */ './Login'));

class Routes extends React.Component {
  static propTypes={
    history: PropTypes.object.isRequired, //eslint-disable-line
    user:PropTypes.object.isRequired, //eslint-disable-line
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    // check if islogged in , else throw him to login page
    if (!this.props.user.id) {
      this.props.history.push('/login'); // rooute to login if user is not logged
    }
  }
  render() {
    return (
      <article className="routes_wrapper">
        <ErrorHandler>
          {
            this.props.user.id ? // if is logged in only then allow routes
              <Switch>
                <Route exact path="/" component={HomeComponent} />
                <Route exact path="/project/:id" component={ProjectComponent} />
                <Route exact path="/login" component={LoginComponent} />
              </Switch>
            :
              <Route exact path="/login" component={LoginComponent} /> // else this
          }
        </ErrorHandler>
      </article>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}
function mapStateToProps(store) {
  return {
    user: store.app.user,
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
