import React from 'react';
import PropTypes from 'prop-types';
import OrderItem from './orderItem';

function OrderList({ vse }) {
  const [...orders] = vse;
  return (
    <ul>
      {orders.map((order) => <OrderItem order={order} />)}
    </ul>
  );
}
OrderList.propTypes = {
  vse: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default OrderList;
