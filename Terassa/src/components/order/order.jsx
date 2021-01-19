import React from 'react';
import Orders from './orders';
import OrderList from './orderList';
import FindOrder from './findOrder';

function Order() {
  const [orders, setOrder] = React.useState(Orders());
  // console.log(Orders());
  function addOrder(number) {
    setOrder(
      orders.concat([
        {
          nomber: number,
          name: 'layra',
          time: 'time',
          table: 'number',
          option: 'none',
        },
      ]),
    );
  }
  return (
    <div className="orderList">
      <FindOrder onCreate={addOrder} />
      <h1>Order List</h1>
      <OrderList vse={orders} />
    </div>
  );
}

export default Order;
