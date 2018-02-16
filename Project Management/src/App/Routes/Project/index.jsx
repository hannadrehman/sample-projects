/*
* @component Project
* @type statefull Component
* @children ListTile,Message
* @requires React,connect,withRouter,bindActionCreators,prop-types
* @reduxActions true
* @actions
* @description
* this is a route component which has url /
* this component will display all the projects of the project manager
*/

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Message from './Message';
import ListTile from './ListTile';

import { projectDetails } from './utility';
import { projectsDetailsAction, addNewList } from './actions';


import './style.scss';
// actions


class Project extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object, //eslint-disable-line
    history: PropTypes.object, //eslint-disable-line
    match: PropTypes.object, //eslint-disable-line
    projectsDetailsAction: PropTypes.func.isRequired,
    addNewList: PropTypes.func.isRequired,
    project: PropTypes.object, //eslint-disable-line
  }
  constructor(props) {
    super(props);
    this.state = {
      // project:[],
      hasError: false,
      projectId: this.props.match.params.id,
      loading: false,
    };
    this.renderList = this.renderList.bind(this);
    this.addList = this.addList.bind(this);
  }
  componentWillMount() {
    try {
      // call api to fetch projects for the manager
      if (this.props.user.id) {
        // check if project details is present or not
        if (!this.props.project[this.state.projectId]) {
          this.setState(prevState => ({ ...prevState, loading: true }));
          projectDetails().then((success) => {
            this.setState(prevState => ({ ...prevState, loading: false }));
            this.props.projectsDetailsAction(success, this.state.projectId);
          }, () => {
            this.setState(prevState => (
              {
                ...prevState,
                hasError: true,
                loading: false,
              }
            ));
          });
        }
      } else {
        this.props.history.push('/login');
      }
    } catch (e) {
      throw e;
    }
  }
  addList() {
    try {
      const projectList = this.props.project[this.state.projectId];
      let prevList;
      if (projectList) {
        prevList = projectList[projectList.length - 1];
      }
      let id = (prevList) ? prevList.id : 0;
      const list = {
        title: 'untitled list',
        id: id += 1,
        tasks: [],
      };
      this.props.addNewList(list, this.state.projectId);
    } catch (e) {
      throw e;
    }
  }
  renderList() {
    const project = this.props.project[this.state.projectId];
    if (project) {
      return project.map(current => (
        <ListTile projectId={this.state.projectId} projectListItem={current} key={current.id} />
      ));
    }
    return '';
  }

  render() {
    return (
      <article className="projectdetails-wrapper">
        <h3>Name: {this.props.user.name} | Role: {this.props.user.role}</h3>
        {
            (this.props.user.role === 'manager' ||
              this.props.user.role === 'owner') ?
                <span>
                  <button className="addList" onClick={this.addList}>Add List</button>
                </span>
          : ''
          }
        <section className="list-box">
          {this.renderList()}
        </section>
        <section className="errot-tile">
          <Message
            type="danger"
            message="Some Error Occured. please try again"
            visible={this.state.hasError}
          />
          {this.state.loading && 'Please Wait Loading From API...'}
        </section>
      </article>
    );
  }
}

// eslint-disable
function mapStateToProps(store) {
  return {
    user: store.app.user,
    project: store.routes.project.projectDetails,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    projectsDetailsAction,
    addNewList,
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Project));
