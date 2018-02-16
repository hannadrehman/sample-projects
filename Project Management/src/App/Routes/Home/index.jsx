/**
* @component Home
* @type statefull Component
* @children Message,ProjectTile,TextBox
* @requires React,connect,withRouter,bindActionCreators,prop-types
* @reduxActions true
* @actions fetchMyProjects
* @description
* this is a route component which has url /
* this component will display all the projects of the project manager
*/

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import ProjectTile from './ProjectTile';
import Message from './Message';
import TextBox from './TextBox';


import { fetchProjects, isEqual } from './utility';

import { fetchMyProjects, addNewProject } from './actions';

import './style.scss';
// actions


class Home extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object, //eslint-disable-line
    user: PropTypes.object, //eslint-disable-line
    fetchMyProjects: PropTypes.func.isRequired,
    projects: PropTypes.array, //eslint-disable-line
    addNewProject: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      hasError: false,
      loading: false,
      addProject: false,
      newProject: {
        name: '',
      },
    };
    this.renderProjectTiles = this.renderProjectTiles.bind(this);
    this.addProject = this.addProject.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /**
   * @method componentWillMount
   * @memberOf Home Component
   * @description tthis function will be called when the
   * component is mounted. we will use it to make
   * the api calls to fetch the manager projects
   */
  componentWillMount() {
    try {
      // call api to fetch all projects for the manager
      if (this.props.user.id) {
        // call api only if there is nothing in the store
        if (this.props.projects.length === 0) {
          this.setState(prevState => ({ ...prevState, loading: true }));
          fetchProjects(this.props.user.id).then((success) => {
            this.setState(prevState => ({ ...prevState, loading: false }));
            this.props.fetchMyProjects(success);
          }, () => {
            this.setState(prevState => (
              {
                ...prevState,
                hasError: true,
                loading: false,
              }
            ));
          });
        } else { // set state from existing props
          this.setState(prevState => (
            {
              ...prevState,
              projects: [...prevState.projects, ...this.props.projects],
            }
          ));
        }
      } else {
        this.props.history.push('/login');
      }
    } catch (e) {
      throw e;
    }
  }
  /**
   * @method componentWillReceiveProps
   * @memberOf Home Component
   * @param {object} nextProps
   * @description this function will be called if the props
   * of the component change. we will need to re render the data
   * again. in this case a project might get added if the owner
   * decided to add it again.
   */
  componentWillReceiveProps(nextprops) {
    try {
      // will recieve new props when store changes
      const result = isEqual(nextprops.projects, this.state.projects);
      if (!result) {
        this.setState(prevState => (
          {
            ...prevState,
            projects: [...nextprops.projects],
          }
        ));
      }
    } catch (e) {
      throw e;
    }
  }
  /**
   * @method addProject
   * @memberOf Home Component
   * @description this function will show add options for a project
   * and will be bisible to only owner
   */
  addProject() {
    this.setState(prevState => (
      {
        ...prevState,
        addProject: true,
      }
    ));
  }
  /**
   * @method saveProject
   * @memberOf Home Component
   * @description this function will dispatch the new project details
   * that will be stored in the store. only owner should be able to do it.
   */
  saveProject() {
    try {
      const newProject = {
        projectId: `p${Math.floor(Math.random() * 100) + 1}`,
        projectName: this.state.newProject.name,
        managerId: this.props.user.id,
      };
      this.props.addNewProject(newProject);
      this.setState(prevState => (
        {
          ...prevState,
          addProject: false,
        }
      ));
    } catch (e) {
      throw e;
    }
  }
  /**
   * @method handleChange
   * @memberOf Home Component
   * @description this will save the textbox value of new project name into the
   * state
   */
  handleChange(value) {
    this.setState(prevState => (
      {
        ...prevState,
        newProject: {
          ...prevState.newProject,
          name: value,
        },
      }
    ));
  }
  /**
   * @method renderProjectTiles
   * @memberOf Home Component
   * @description this function will itrate over all
   * the projects of a manager and render the ProjectTile
   * component based on the data. this function is written
   * to make render function clean
   */
  renderProjectTiles() {
    if (this.state.projects.length) {
      return this.state.projects.map(current =>
        (<ProjectTile key={current.projectId} project={current} />));
    }
    return '';
  }

  render() {
    return (
      <article className="home-wrapper">
        <h3>Name: {this.props.user.name} | Role: {this.props.user.role}</h3>
        <h3>All Projects Mapped to You</h3>
        <section className="home-tiles">
          {this.renderProjectTiles()}
          <Message
            type="danger"
            message="Some Error Occured. please try again"
            visible={this.state.hasError}
          />
          {this.state.loading && 'Please Wait Loading From API...'}
        </section>
        {
          (!this.state.loading && this.props.user.role === 'owner' && !this.state.addProject) ?
            <button onClick={this.addProject} className="action">Add a project</button>
          : ''
        }
        <section>
          {
          (this.props.user.role === 'owner' && this.state.addProject) ?
            <section>
              <TextBox
                placeholder="Project name"
                id="name"
                cssClass="textbox"
                onChanges={this.handleChange}
                type="text"
                value={this.state.newProject.name}
              />
              <button onClick={this.saveProject} className="action">Add a project</button>
            </section>
            : ''
          }
        </section>
      </article>
    );
  }
}

// eslint-disable
function mapStateToProps(store) {
  return {
    user: store.app.user,
    projects: store.routes.home.projects,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchMyProjects,
    addNewProject,
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
