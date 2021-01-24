import React from 'react';
import PropTypes from 'prop-types';

function OptionElement({ element }) {
  const { flovers, hookah, special } = element;
  return (
    <>
      <div>{flovers}</div>
      <div>{hookah}</div>
      <div>{special}</div>
    </>
  );
}
OptionElement.propTypes = {
  element: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default OptionElement;
