import React from 'react';
import PropTypes from 'prop-types';
import OrderItem from './orderItem';

const styles = {
  ul: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
};

function OrderList({ vse }) {
  const [...orders] = vse;
  return (
    <ul style={styles.ul}>
      {orders.map((order) => <OrderItem order={order} key={order.name} />)}
    </ul>
  );
}
OrderList.propTypes = {
  vse: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default OrderList;
