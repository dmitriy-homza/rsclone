import React from 'react';
import PropTypes from 'prop-types';
import MenuDishes from './menuDishes';
// import OrderItem from './orderItem';
import Options from './options';
import '../../styles/order.scss';

function OrderList({ order }) {
  const {
    name, table, additions, date,
  } = order;

  return (
    <div className="orderList">
      <div>{name}</div>

      <div>{date}</div>
      {<Options table={table} />}
      {<MenuDishes additions={additions} />}
    </div>
  );
}
OrderList.propTypes = {
  order: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default OrderList;
