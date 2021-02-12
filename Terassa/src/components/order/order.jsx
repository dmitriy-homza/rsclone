import React, { useState, useEffect } from 'react';
import {
  Alert,
} from 'reactstrap';
import firebase from '../../core/firebase';
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
      <section className="flex-grow-1 anon-orders">
        <FindOrder onCreate={findOrder} />
        <Alert color="danger">
          Your order is not
          founded!
        </Alert>
      </section>
    );
  }
  return (
    <div className="flex-grow-1 anon-orders">
      <div className="allBlock">
        <FindOrder onCreate={findOrder} />
      </div>
      <div>
        {!order.visit ? 'Введите номер заказа' : <OrderList order={order} />}
      </div>
    </div>
  );
}

export default Order;
