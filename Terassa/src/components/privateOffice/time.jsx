import React from 'react';
import PropTypes from 'prop-types';

function Time({ timeElem }) {
  const [, time] = timeElem;

  return (
    <>
      <span>{time}</span>
    </>
  );
}
Time.propTypes = {
  timeElem: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default Time;
