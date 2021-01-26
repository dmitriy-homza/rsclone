import React from 'react';
import PropTypes from 'prop-types';
import OptionElement from './optionElement';

function Options({ option }) {
  const [...opt] = option;
  return (
    <div>
      { opt.map((element) => (
        <OptionElement
          element={element}
          key={option.id}
        />
      )) }
    </div>
  );
}
Options.propTypes = {
  option: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Options;
