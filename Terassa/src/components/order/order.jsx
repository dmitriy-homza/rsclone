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
      <section>
        <FindOrder onCreate={findOrder} />
        <h1>Order List</h1>
        <p> Заказ с таким номером не существует</p>
      </section>
    );
  }
  return (
    <>
      <div className="allBlock">
        <FindOrder onCreate={findOrder} />
      </div>
      <div>
        <h1>Order List</h1>
        {order === ts ? 'Введите номер заказа' : <OrderList order={order} />}
      </div>
    </>
  );
}

export default Order;
