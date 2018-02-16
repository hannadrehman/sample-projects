import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Message = ({ type, message, visible }) => (
  <article className={`message-wrapper ${visible}`}>
    <div className={`message-box ${type}`}>{message}</div>
  </article>
);
Message.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool,
};
Message.defaultProps = {
  type: 'info',
  visible: false,
};

export default Message;
