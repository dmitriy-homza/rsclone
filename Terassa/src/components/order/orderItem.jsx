import React from 'react';
import PropTypes from 'prop-types';

function OrderItem({ order }) {
  const {
    name, nomber,
  } = order;
  return (
    <li>
      <span>
        <div>{name}</div>
        <div>{nomber}</div>
      </span>
    </li>
  );
}
OrderItem.propTypes = {
  order: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default OrderItem;
