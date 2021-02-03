import React from 'react';
import PropTypes from 'prop-types';

function Time({ timeElem }) {
  const [quantity] = timeElem;
  return (
    <>

      <span>{quantity}</span>

    </>
  );
}
Time.propTypes = {
  timeElem: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default Time;
