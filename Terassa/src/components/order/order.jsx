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
    setOrder(ts.find((ord) => (ord.nomber.toString() === number)));
  }

  console.log(order);
  if (order === undefined) {
    return (
      <div>
        <FindOrder onCreate={findOrder} />
        <h1>Order List</h1>
        <p> Валера все хуйня давай по новой</p>
      </div>
    );
  }
  return (
    <div className="allBlock">
      <FindOrder onCreate={findOrder} />
      <h1>Order List</h1>
      {order === ts ? 'Not exsist' : <OrderList order={order} />}
    </div>
  );
}

export default Order;
