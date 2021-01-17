import React from 'react';
import PropTypes from 'prop-types';
import OrderItem from './orderItem';

function OrderList(props) {
  return (
    <ul>
      {props.vse.map((order) => <OrderItem order={order} key={order.name} />)}
    </ul>
  );
}
OrderList.propTypes = {
  vse: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default OrderList;
