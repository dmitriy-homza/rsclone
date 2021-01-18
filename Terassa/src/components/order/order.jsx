import React from 'react';
// import PropTypes from 'prop-types';
import Orders from './orders';
import OrderList from './orderList';

function Order() {
  // const [...vse] = Orders();
  console.log(Orders());
  // console.log(vse[1].name);
  // for (let i = 0; i <= vse.length - 1; i++) {
  //  const {
  //   name, time, number, option,
  // } = vse[i];
  // }
  return (
    <div className="orderList">
      <h1>Order List</h1>
      <OrderList vse={Orders()} />
    </div>
  );
}

export default Order;
