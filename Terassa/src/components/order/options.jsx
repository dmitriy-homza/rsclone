import React from 'react';
import PropTypes from 'prop-types';

function Options({ table }) {
  const { ...opt } = table;
  const { number, persons } = opt;
  return (
    <>
      <div>{number}</div>
      <div>{persons}</div>
    </>
  );
}
Options.propTypes = {
  table: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Options;
