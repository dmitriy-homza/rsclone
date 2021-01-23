import React from 'react';
import PropTypes from 'prop-types';

const basketElement = ({ position }) => (
  <>
    <h5>{position.name}</h5>
    <h5>{position.weight}</h5>
    <h5>{position.cost}</h5>
    <h5>{position.time}</h5>
    <h5>{position.id}</h5>
  </>
);

basketElement.propTypes = {
  position: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default basketElement;
