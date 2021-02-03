import React from 'react';
import PropTypes from 'prop-types';

function Time({ timeElem }) {
  const [quantity] = timeElem;
  return (
    <>
      <div>{quantity}</div>
    </>
  );
}
Time.propTypes = {
  timeElem: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Time;
