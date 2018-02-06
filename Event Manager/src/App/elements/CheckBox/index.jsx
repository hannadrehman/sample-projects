// this module is written to display a checkbox with label
/*
* @component CheckBox
* @type functional Component
* @props {string} label
* @props {string} id
* @props {function} onChanges
* @children none
* @requires React,prop-types,
* @reduxActions false
* @description
* this is a simple check box component with a label which takes id, label and on
* onChanges callback which will be called when the onChange event of the checkbox will be called
*/

import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({
  label, id, onChanges,
}) => {
  const handleChanges = (ev) => {
    if (onChanges && typeof onChanges === 'function') { onChanges(ev.target.checked, ev); }
  };
  return (
    <article>
      <label htmlFor={id}>
        <input
          id={id}
          name={id}
          type="checkbox"
          onChange={handleChanges}
          data-checkbox-id={id}
        />
        {label}
      </label>
    </article>
  );
};
CheckBox.defaultProps = {
  label: 'Label for check box',
};
CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChanges: PropTypes.func.isRequired,
};
export default CheckBox;
