/*
* @component TextBox
* @type functional Component
* @props {string} placeholder
* @props {string} id
* @props {string} cssClass
* @props {string} type
* @props {function} onChanges
* @children none
* @requires React,prop-types,
* @reduxActions false
* @description
* this is a input component which will render a textbox with
* placeholder and id , a callback onChanges will be called on every change
* in the text box.
*/

import React from 'react';
import PropTypes from 'prop-types';

const TextBox = ({
  placeholder, id, onChanges, cssClass, type,
}) => {
  const handleChanges = (ev) => {
    if (onChanges && typeof onChanges === 'function') { onChanges(ev.target.value, ev); }
  };
  return (
    <article>
      <input
        id={id}
        type={type}
        onChange={handleChanges}
        placeholder={placeholder}
        className={cssClass}
      />
    </article>
  );
};
TextBox.defaultProps = {
  placeholder: 'Enter Text',
  type: 'text',
};
TextBox.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChanges: PropTypes.func.isRequired,
  cssClass: PropTypes.string.isRequired,
  type: PropTypes.string,
};
export default TextBox;
