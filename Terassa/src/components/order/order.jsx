import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import OrderList from './orderList';
import FindOrder from './findOrder';

function Order() {
  const [answer, setData] = useState('error');
  useEffect(() => {
    const fetchData = async () => {
      const result = await firebase
        .database()
        .ref('anonOrders')
        .once('value')
        .then((snapshot) => snapshot.val());
      setData(result);
    };
    fetchData();
  }, []);
  const [order, setOrder] = React.useState({});

  function findOrder(number) {
    setOrder(answer[number]);
  }

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
        {!order.visit ? 'Введите номер заказа' : <OrderList order={order} />}
      </div>
    </>
  );
}

export default Order;
