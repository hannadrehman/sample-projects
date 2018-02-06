/*
* @component EventItem
* @type functional Component
* @children none
* @requires React,prop-types
* @reduxActions false
* @actions none
* @description
* this component takes an event object and displays the data
*/

import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const EventItem = ({
  event,
}) => (
  <article className="event-item-wrapper">
    <div className="event-item">
      <p>{event.name}</p>
      <p>{event.description}</p>
      <p><span>Venue : </span>{event.venue}</p>
      <p><span>Price : </span>{event.price}</p>
      <p><span>Discount : </span>{event.discount}</p>
    </div>
  </article>
);

EventItem.propTypes = {
  event: PropTypes.object, // eslint-disable-line
};
export default EventItem;
