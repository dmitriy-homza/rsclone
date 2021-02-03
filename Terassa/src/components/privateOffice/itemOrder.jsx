import React from 'react';
import PropTypes from 'prop-types';

function ItemOrder({ item }) {
  const { cost } = item;

  return (
    <>
      {cost}
    </>
  );
}

ItemOrder.propTypes = {
  item: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default ItemOrder;
