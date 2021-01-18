import React from 'react';
import PropTypes from 'prop-types';

function OrderItem({ order }) {
  const {
    nomber, // table, option,
  } = order;
  return (
    <li>
      <div>

        <div>{nomber}</div>
      </div>

    </li>
  );
}
OrderItem.propTypes = {
  order: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default OrderItem;
