import React from 'react';
import Orders from './orders';
import OrderList from './orderList';
import FindOrder from './findOrder';

function Order() {
  const [...orders] = Orders();
  const arr = [];
  function createArrOrder(array) {
    array.forEach((element) => {
      arr.push(element);
    });

    return arr;
  }
  const [...ts] = createArrOrder(orders);

  const [order, setOrder] = React.useState(ts);

  function findOrder(number) {
    setOrder(
      ts.find((ord) => (ord.nomber.toString() === number)),
    );
  }
  console.log(typeof order, order.length);
  if (order.length === undefined) {
    return (
      <div className="orderList">
        <FindOrder onCreate={findOrder} />
        <h1>Order List</h1>
        <OrderList vse={order} />
      </div>
    );
  } if (order.length !== 1) {
    return (
      <div className="orderList">
        <FindOrder onCreate={findOrder} />
        <h1>Order List</h1>
        <p>Введите номер заказа</p>
      </div>
    );
  }
}

export default Order;
