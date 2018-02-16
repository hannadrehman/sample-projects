/*
* @component ListTile
* @type functional Component
* @children Card,TextBox
* @requires React,prop-types
* @reduxActions false
* @actions none
* @description
* this component takes displays the details of a project in the form
* of a list
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Card from './Card';
import TextBox from './TextBox';

import { listTileAction, saveNewTaskAction, deleteList } from './actions';

import './style.scss';

class ListTile extends React.Component {
  static propTypes = {
    projectListItem: PropTypes.object, // eslint-disable-line
    projectId: PropTypes.string.isRequired,
    user: PropTypes.object, //eslint-disable-line
    listTileAction: PropTypes.func.isRequired,
    saveNewTaskAction: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.projectListItem.title || '',
      action: 'edit',
      addNewTask: false,
      newTask: {
        title: '',
        description: '',
        assignedTo: '',
      },
    };
    this.edit = this.edit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNewTaskChange = this.handleNewTaskChange.bind(this);
    this.addNewTaskNow = this.addNewTaskNow.bind(this);
    this.saveNewTask = this.saveNewTask.bind(this);
    this.delete = this.delete.bind(this);
  }
  /**
   * @method delete
   * @memberOf ListTile Component
   * @description this function will dispatch the action
   * that will delete the list itself.
   */
  delete() {
    this.props.deleteList(this.props.projectId, this.props.projectListItem.id);
  }
  /**
   * @method edit
   * @memberOf ListTile Component
   * @description this function will dispatch the action
   * that has editted title information. here we are
   * allowing user to edit the title of the list tile.
   * to save that this action is dispatched here.
   */
  edit(ev) {
    const { currentTarget: { dataset: { state } } } = ev;
    this.setState(prevState => (
      {
        ...prevState,
        action: (state === 'save') ? 'edit' : 'save',
      }
    ), () => {
      // on success state set dispatch action with new title
      if (this.state.action === 'edit') {
        const copyCardFromProps = { ...this.props.projectListItem };
        // assign new values
        copyCardFromProps.title = this.state.title;
        // dispatch action
        this.props.listTileAction(
          copyCardFromProps,
          this.props.projectId,
          this.props.projectListItem.id,
        );
      }
    });
  }
  /**
   * @method handleChange
   * @memberOf ListTile Component
   * @param {string} value
   * @description this function will be called as a
   * callback fn for the onchanges event of a Textbox.
   * it will have value of the textbox as a param
   * and we will store it in our state.
   * this is used to edit the title of the list
   */
  handleChange(value) {
    this.setState(prevState => (
      {
        ...prevState,
        title: value,
      }
    ));
  }
  /**
   * @method handleNewTaskChange
   * @memberOf ListTile Component
   * @param {string} value
   * @param {object} ev
   * @description this function will be called on changes
   * of new task addition text boxes.a dn we will store
   * that in our newTask state object.
   */
  handleNewTaskChange(value, ev) {
    const { currentTarget: { id } } = ev;
    this.setState(prevState => (
      {
        ...prevState,
        newTask: {
          ...prevState.newTask,
          [id.slice('newtask'.length)]: value, // slice is done to remove 'newTask' from newTaskTile
        },
      }
    ));
  }
  /**
   * @method addNewTaskNow
   * @memberOf ListTile Component
   * @description this function will set state
   * to add a new task and show the text boxes for that
   */
  addNewTaskNow() {
    this.setState(prevState => ({
      ...prevState,
      addNewTask: true,
    }));
  }
  /**
   * @method saveNewTask
   * @memberOf ListTile Component
   * @description this function will dispatch the event
   * to add a new task to the list..
   */
  saveNewTask() {
    try {
      // get old list
      const list = this.props.projectListItem.tasks;
      let task;
      // get last id and increment +1
      if (list) {
        task = list[list.length - 1];
      }
      // if no prev task means nothing is in the list. then start with 0
      let prevId = (task) ? task.id : 0;
      const taskOb = {
        id: prevId += 1,
        title: this.state.newTask.title,
        description: this.state.newTask.description,
        assignedTo: this.state.newTask.assignedTo,
        assignedBy: this.props.user.name,
      };
      // dispatch
      this.props.saveNewTaskAction(taskOb, this.props.projectId, this.props.projectListItem.id);
      // set defaults
      this.setState(prevState => (
        {
          ...prevState,
          addNewTask: false,
          newTask: {
            title: '',
            description: '',
            assignedTo: '',
          },
        }));
    } catch (e) {
      throw e;
    }
  }
  render() {
    return (
      <article className="projectlist-wrapper">
        <section className="title">
          { // show delete option to only manager and owner
            (this.props.user.role === 'manager' ||
              this.props.user.role === 'owner') ?
                <button
                  onClick={this.delete}
                  data-type="delete"
                  className="action top-left"
                >
                  Delete
                </button>
          : ''
          }
          {// show edit option to only manager and owner
            (this.state.action === 'edit')
            ?
              <p>{this.props.projectListItem.title}</p>
            :
              <TextBox
                placeholder=""
                id="title"
                cssClass="textbox"
                onChanges={this.handleChange}
                type="text"
                value={this.state.title}
              />
          }
          {
            (this.props.user.role === 'manager' ||
              this.props.user.role === 'owner') ?
                <button
                  onClick={this.edit}
                  data-type="title"
                  data-state={this.state.action}
                  className="action"
                >
                  {this.state.action}
                </button>
          : ''
          }
        </section>
        <section className="cards-in-side">
          {
       this.props.projectListItem.tasks.map(current =>
        (<Card
          card={current}
          projectId={this.props.projectId}
          listId={this.props.projectListItem.id}
          key={current.id}
        />))
    }
        </section>
        { // show add option to only manager and owner
          (!this.state.addNewTask && (this.props.user.role === 'owner' ||
        this.props.user.role === 'manager')) ?
          <button onClick={this.addNewTaskNow} className="new-task">+</button>
           : (
             <section className={`${(this.props.user.role === 'owner' ||
             this.props.user.role === 'manager') ? 'show' : 'hide'}`}
             >
               <TextBox
                 placeholder="Task Title"
                 id="newTasktitle"
                 cssClass="textbox"
                 onChanges={this.handleNewTaskChange}
                 type="text"
                 value={this.state.newTask.title}
               />
               <TextBox
                 placeholder="Task Description"
                 id="newTaskdescription"
                 cssClass="textbox"
                 onChanges={this.handleNewTaskChange}
                 type="text"
                 value={this.state.newTask.description}
               />
               <TextBox
                 placeholder="Assigned To"
                 id="newTaskassignedTo"
                 cssClass="textbox"
                 onChanges={this.handleNewTaskChange}
                 type="text"
                 value={this.state.newTask.assignedTo}
               />
               <p>Assigned By {this.props.user.name} </p>
               <button onClick={this.saveNewTask} >Save </button>
             </section>
           )
        }
      </article>
    );
  }
}

// eslint-disable
function mapStateToProps(store) {
  return {
    user: store.app.user,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    listTileAction,
    saveNewTaskAction,
    deleteList,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTile);
