/*
* @component Card
* @type statefull Component
* @children TextBox
* @requires React,prop-types
* @reduxActions false
* @actions none
* @description
* this component displays the task card
*/

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextBox from './TextBox';

import { cardsDetailsAction, deleteNewTaskAction } from './actions';

import './style.scss';

class Card extends React.Component {
  static propTypes = {
    card: PropTypes.object, // eslint-disable-line
    projectId: PropTypes.string.isRequired,
    listId: PropTypes.number.isRequired,
    user: PropTypes.object, //eslint-disable-line
    cardsDetailsAction: PropTypes.func.isRequired,
    deleteNewTaskAction: PropTypes.func.isRequired,

  };
  constructor(props) {
    super(props);
    this.state = {
      values: {
        title: this.props.card.title || '',
        description: this.props.card.description || '',
        assignedTo: this.props.card.assignedTo || '',
      },
      actions: {
        title: 'edit',
        description: 'edit',
        assignedTo: 'edit',
      },
    };
    this.edit = this.edit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
  }
  /**
   * @method componentWillReceiveProps
   * @memberOf Card Component
   * @param {object} nextProps
   * @description this function will be called when props change
   * that will happen when we edit and save a task
   * in that case we want to set our state variables updated
   * because that is waht we see when edit textbox appears
   */
  componentWillReceiveProps(nextProps) {
    this.setState(prevState => (
      {
        ...prevState,
        values: {
          ...prevState.values,
          title: nextProps.card.title,
          description: nextProps.card.description,
          assignedTo: nextProps.card.assignedTo,
        },
      }
    ));
  }
  /**
   * @method edit
   * @memberOf Card Component
   * @param {object} ev
   * @description this function will be called when user
   * clicks on edit side to any editable filed.
   * we are setting a edit flag for each field in this function,
   * based on that flag the textbox will be shown with the value
   * so that it can be edited.
   */
  edit(ev) {
    // get meta
    const { target: { dataset: { type, state } } } = ev;
    // set state
    this.setState(prevState => (
      {
        ...prevState,
        actions: {
          ...prevState.actions,
          [type]: (state === 'save') ? 'edit' : 'save',
        },
      }
    ), () => {
      // on success state set dispatch action with new datas
      // this will casuse store to update and cour
      // component will recieve props will be fired
      if (this.state.actions[type] === 'edit') {
        const copyCardFromProps = { ...this.props.card };
        // assign new values
        copyCardFromProps.title = this.state.values.title;
        copyCardFromProps.description = this.state.values.description;
        copyCardFromProps.assignedTo = this.state.values.assignedTo;
        // dispatch action
        this.props.cardsDetailsAction(
          copyCardFromProps,
          this.props.projectId,
          this.props.listId,
          copyCardFromProps.id,
        );
      }
    });
  }
  /**
   * @method delete
   * @memberOf Card Component
   * @description this function is used to call when to delete
   * a task. it will dispatch an action which will update the
   * store and delete the task from there. causing a re render in
   * the parent component with updated data set,
   */
  delete() {
    this.props.deleteNewTaskAction(
      this.props.projectId,
      this.props.listId,
      this.props.card.id,
    );
  }
  /**
   * @method handleChange
   * @memberOf Card Component
   * @param {string} value
   * @param {object} ev
   * @description this function will be used to set the
   * state of the editable textboxes so that we can upfate the
   * store with new values.
   */
  handleChange(value, ev) {
    const { target: { id } } = ev;
    this.setState(prevState => (
      {
        ...prevState,
        values: {
          ...prevState.values,
          [id]: value,
        },
      }
    ));
  }
  render() { // edit option will only be shown to managers and owners
    return (
      <article className="card-wrapper">
        <div className="card-title">
          {
            (this.props.user.role === 'manager' ||
              this.props.user.role === 'owner') ?
                <button
                  onClick={this.delete}
                  data-type="delete"
                  className="action top-right"
                >
                  Delete
                </button>
          : ''
          }

          {
            (this.state.actions.title === 'edit')
            ?
              <p>{this.props.card.title}</p>
            :
              <TextBox
                placeholder=""
                id="title"
                cssClass="textbox"
                onChanges={this.handleChange}
                type="text"
                value={this.state.values.title}
              />
          }
          {
            (this.props.user.role === 'manager' ||
              this.props.user.role === 'owner') ?
                <button
                  onClick={this.edit}
                  data-type="title"
                  data-state={this.state.actions.title}
                  className="action"
                >
                  {this.state.actions.title}
                </button>
          : ''
          }
        </div>
        <div className="card-title">

          {
            (this.state.actions.description === 'edit')
            ?
              <p>{this.props.card.description}</p>
            :
              <TextBox
                placeholder=""
                id="description"
                cssClass="textbox"
                onChanges={this.handleChange}
                type="text"
                value={this.state.values.description}
              />
          }
          {
            (this.props.user.role === 'manager' ||
              this.props.user.role === 'owner') ?
                <button
                  onClick={this.edit}
                  data-type="description"
                  data-state={this.state.actions.description}
                  className="action"
                >
                  {this.state.actions.description}
                </button>
          : ''
          }
        </div>
        <div className="card-title">
        Assigned to :
          {
            (this.state.actions.assignedTo === 'edit')
            ?
              <p>{this.props.card.assignedTo}</p>
            :
              <TextBox
                placeholder=""
                id="assignedTo"
                cssClass="textbox"
                onChanges={this.handleChange}
                type="text"
                value={this.state.values.assignedTo}
              />
          }
          {
            (this.props.user.role === 'manager' ||
              this.props.user.role === 'owner') ?
                <button
                  onClick={this.edit}
                  data-type="assignedTo"
                  data-state={this.state.actions.assignedTo}
                  className="action"
                >
                  {this.state.actions.assignedTo}
                </button>
          : ''
          }
        </div>
        <p className="card-title">Assigned by : {this.props.card.assignedBy}</p>
      </article>
    );
  }
}


function mapStateToProps(store) {
  return {
    user: store.app.user,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    cardsDetailsAction,
    deleteNewTaskAction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
