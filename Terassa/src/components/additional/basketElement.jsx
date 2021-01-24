import React from 'react';
import PropTypes from 'prop-types';

const basketElement = ({ position }) => (
  <div>
    <h5>{position.name}</h5>
    <h5>{position.weight}</h5>
    <h5>{position.cost}</h5>
    <h5>{position.time}</h5>
    <h5>{position.id}</h5>
  </div>
);

basketElement.propTypes = {
  // eslint-disable-next-line max-len
  position: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number])).isRequired,
};

export default basketElement;
