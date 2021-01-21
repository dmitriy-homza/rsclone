import React from 'react';
import Orders from './orders';
import OrderList from './orderList';
import FindOrder from './findOrder';

function Order() {
  const [orders, setOrder] = React.useState(Orders());
  // console.log(Orders());

  function findOrder(number) {
    setOrder(
      orders.find((ord) => (ord.nomber.toString() === number)),
      // arr.push(orders.find((ord) => ord.nomber === number)),

    );
  }

  return (
    <div className="orderList">
      <FindOrder onCreate={findOrder} />
      <h1>Order List</h1>
      <OrderList vse={orders} />
    </div>
  );
}

export default Order;
