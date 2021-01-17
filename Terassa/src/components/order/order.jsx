import React from 'react';
// import PropTypes from 'prop-types';
import Orders from './orders';
import OrderList from './orderList';

export default function Order() {
  const [...vse] = Orders();
  // console.log(Orders()[1].name);
  // console.log(vse[1].name);
  // for (let i = 0; i <= vse.length - 1; i++) {
  //  const {
  //   name, time, number, option,
  // } = vse[i];
  // }
  return (
    <div className="orderList">
      <h1>Order List</h1>
      <OrderList vse={vse} />
    </div>
  );
}
