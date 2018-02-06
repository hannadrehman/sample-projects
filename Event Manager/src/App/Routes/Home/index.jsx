/*
* @component Home
* @type statefull Component
* @children TextBox
* @requires React,connect,withRouter,bindActionCreators,prop-types
* @reduxActions true
* @actions saveEvent
* @description
* this is a route component which has url /
* this component will take user input and create
* an event object and dispatch that as a redux action
* redux will take care of storing that in the store.
*/

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';

import TextBox from './TextBox';

import './style.scss';
// actions
import { saveEvent } from './actions';


class Home extends React.PureComponent {
  static propTypes = {
    saveEvent: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    // defautl state
    this.state = {
      form: {
        name: null,
        description: null,
        venue: null,
        price: null,
        discount: null,
      },
      error: false,
      saved: false,
    };
    this.defaultForm = {
      name: null,
      description: null,
      venue: null,
      price: null,
      discount: null,
    };
    // bind class methods
    this.renderForm = this.renderForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }
  // all textbox value changes
  handleChange(text, originalEvent) {
    const { target: { id } } = originalEvent;
    // set state with updated values from textbox
    this.setState(prevState =>
      (
        {
          ...prevState,
          form: {
            ...prevState.form,
            [id]: text,
          },
          saved: false,
        }
      ));
  }
  // submits data
  submit() {
    // check if form is valid.
    // validity here means that all textboxes have some data
    const isValid = this.checkValidity();
    if (isValid) { // if valid emit action
      // hide error message and dispatch the event
      this.setState(prevState => (
        {
          ...prevState,
          error: false,
        }
      ));
      // dispatch
      this.props.saveEvent(this.state.form);

      // after dispatch reset the form for new event

      this.setState(prevState => ({
        ...prevState,
        form: this.defaultForm,
        saved: true,
      }), () => {
        // clean from UI
        const allelem = document.getElementsByClassName('textbox-a');
        // done to remove ui state. because textbox is a seperate component
        for (let i = 0; i < allelem.length; i += 1) {
          allelem[i].value = '';
        }
      });
    } else {
      // set all error flags
      this.setState(prevState => (
        {
          ...prevState,
          error: true,
          saved: false,
        }
      ));
    }
  }
  // checks if form is valid
  checkValidity() {
    // a form is valid only if all inputs are provided
    const { form } = this.state;
    const valid = Object.values(form).filter(current => (!current));
    return (valid.length === 0);
  }
  // this will generate the form dynamically from the state object
  // not hardcoding the form so that in future if new text feilds can be added
  renderForm() {
    const { form } = this.state;
    // using object.keys and object.values to itrate over object
    return Object.values(form).map((formField, index) => (
      <div key={Object.keys(form)[index]}>
        <TextBox
          placeholder={Object.keys(form)[index]}
          id={Object.keys(form)[index]}
          cssClass="textbox-a"
          onChanges={this.handleChange}
          type={(
            Object.keys(form)[index] === 'price' || Object.keys(form)[index] === 'discount'
          ) ? 'number' : 'text'}
        />
      </div>
    ));
  }
  renderError() {
    if (this.state.error) {
      return (<p className="error">Please Provide all inputs</p>);
    }
    return '';
  }
  renderSave() {
    if (this.state.saved) {
      return (<p className="success">Saved</p>);
    }
    return '';
  }

  render() {
    return (
      <article className="home-wrapper">
        <section className="">
          <div className="event-title"> Add an Event  </div>
          <section className="form">
            {this.renderForm()}
            <button onClick={this.submit} className="save">Submit</button>
            {this.renderError()}
            {this.renderSave()}
          </section>
        </section>
      </article>
    );
  }
}

// eslint-disable
function mapStateToProps() {
  return {

  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveEvent,
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
