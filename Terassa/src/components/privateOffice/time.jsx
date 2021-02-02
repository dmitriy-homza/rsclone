import React from 'react';
import PropTypes from 'prop-types';

function Time({ timeElem }) {
  const { time } = timeElem;

  return (
    <>
      <td>
        {time}
      </td>
    </>
  );
}
Time.propTypes = {
  timeElem: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Time;
