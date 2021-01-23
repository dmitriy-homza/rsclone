import React from 'react';

import Orders from './orders';
import OrderList from './orderList';
import FindOrder from './findOrder';

function Order() {
  const [...orders] = Orders();
  const arr = [];
  function test(array) {
    array.forEach((element) => {
      arr.push(element);
    });

    return arr;
  }
  const [...ts] = test(orders);

  const [order, setOrder] = React.useState(ts);

  function findOrder(number) {
    setOrder(
      ts.find((ord) => (ord.nomber.toString() === number)),
    );
  }
  console.log(order);
  return (
    <div className="orderList">
      <FindOrder onCreate={findOrder} />
      <h1>Order List</h1>
      <OrderList vse={order} />
    </div>
  );
}

export default Order;
