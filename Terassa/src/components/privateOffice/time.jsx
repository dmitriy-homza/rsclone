import React from 'react';
import PropTypes from 'prop-types';

function Time({ timeElem }) {
  const [, time] = timeElem;

  return (
    <>
      <div>{time}</div>
    </>
  );
}
Time.propTypes = {
  timeElem: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Time;
