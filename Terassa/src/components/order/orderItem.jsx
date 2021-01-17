import React from 'react';
import PropTypes from 'prop-types';

function OrderItem({ order }) {
  // const { order } = this.props;
  return (
    <li>{order.name}</li>
  );
}
OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};
export default OrderItem;
