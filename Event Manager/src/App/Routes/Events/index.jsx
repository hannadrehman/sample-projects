/*
* @component Events
* @type statefull Component
* @children CheckBox,EventItem
* @requires React,connect,withRouter,bindActionCreators,prop-types
* @reduxActions false
* @actions none
* @description
* this is route component that will load /events url
* this component will read the data from the store
* and display it. also we have filters for the data
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';


import CheckBox from './CheckBox';
import EventItem from './EvenItem';

import './style.scss';


class Events extends React.PureComponent {
  static propTypes = {
    events: PropTypes.object,  // eslint-disable-line
  }
  constructor(props) {
    super(props);
    // default state
    this.state = {
      filters: [
        { id: 0, type: 'discount', label: 'Discount' },
        { id: 1, type: 'nodiscount', label: 'No Discount' },
        { id: 2, type: 'free', label: 'Free' },
      ],
      events: this.props.events.eventList,
      appliedFilter: '',
    };
    this.count = 0;
    this.generateFilters = this.generateFilters.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.generateEvents = this.generateEvents.bind(this);
  }

  /** handle changes on the filters.
   * this function will handle the change in the filters and display data accordingly.
   * ASSUMPTIONS MADE IN THE FILTERS.
   * 1. IF FREE FILTER IS SELECTED. THERE IS NO WAY THAT AN EVENT WILL HAVE PRICE/DISCOUNT
   * 2. IF DISCOUNT FILTER IS SELECTED. THERE IS NO WAY AN EVENT WILL BE FREE
   * 3. IF NO DISCOUNT FILTER IS SELECTED THERE IS NO WAY AN EVENT WITH DISCOUNT/FREE WILL APPEAR
   * 4. ALL OF THESE 3 FILTERS CONTRODICT EACH OTHER SO AT ONE TIME ONLY 1 FILTER CAN BE SELECTED
   * based on these 4 assumptions we are hiding the filters accordingly.
   */
  handleChange(value, ev) {
    const { target: { dataset: { checkboxId } } } = ev;
    let newList = [];
    switch (checkboxId) {
      case 'discount':
        newList = [...this.state.events];
        if (value) {
          // filter discount > 0
          newList = newList.filter(current => parseInt(current.discount, 0) > 0
          && parseInt(current.price, 0) !== 0);
          this.setState(prevState => (
            {
              ...prevState,
              events: newList,
              appliedFilter: 'discount',
            }
          ));
        } else {
          // reset
          this.setState(prevState => (
            {
              ...prevState,
              events: this.props.events.eventList,
              appliedFilter: '',

            }
          ));
        }
        break;
      case 'nodiscount':
        newList = [...this.state.events];
        if (value) {
          // filter discount == 0 && price >=0
          newList = newList.filter(current => parseInt(current.discount, 0) === 0
          && parseInt(current.price, 0) !== 0);
          this.setState(prevState => (
            {
              ...prevState,
              events: newList,
              appliedFilter: 'nodiscount',
            }
          ));
        } else {
          this.setState(prevState => (
            {
              ...prevState,
              events: this.props.events.eventList,
              appliedFilter: '',
            }
          ));
        }
        break;
      case 'free':
        newList = [...this.state.events];
        if (value) {
          //  // filter price == 0
          newList = newList.filter(current => parseInt(current.price, 0) === 0);
          this.setState(prevState => (
            {
              ...prevState,
              events: newList,
              appliedFilter: 'free',
            }
          ));
        } else {
          this.setState(prevState => (
            {
              ...prevState,
              events: this.props.events.eventList,
              appliedFilter: '',
            }
          ));
        }
        break;
      default:
        break;
    }
  }
  // will generate components for filters.
  generateFilters() {
    if (!this.props.events.eventList.length) {
      return '';
    }
    const { appliedFilter } = this.state;

    return this.state.filters.map(current => (
      <div className={`filter-item ${(current.type !== appliedFilter && appliedFilter) ? 'hide' : ''}`} key={current.id}>
        <CheckBox label={current.label} id={current.type} onChanges={this.handleChange} />
      </div>
    ));
  }
  // will generate event tiles
  generateEvents() {
    if (this.state.events.length) {
      return this.state.events.map(current => (
        <div key={`${current.name}${current.price}${current.discount}`}>
          <EventItem event={current} />
        </div>
      ));
    }
    return (
      <p className="info">There are no saved Events
        <Link
          className="links"
          to="/"
          href="/"
        >
         click here
        </Link> to add
      </p>);
  }
  render() {
    return (
      <article className="events-wrapper">
        <section className="">
          <section >
            <h3 className="header">Events</h3>
            <div className="results-container">
              <div className="filters">
                {this.generateFilters()}
              </div>
              <div className="events">
                {this.generateEvents()}
              </div>
            </div>
          </section>
        </section>
      </article>
    );
  }
}

// eslint-disable
function mapStateToProps(store) {
  return {
    events: store.routes.home,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Events));
