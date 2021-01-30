import React from 'react';
import Orders from '../order/orders';
import UserOrder from './userOrders';
import Tabs from './tabs';

function PrivateOffice() {
  const [...orders] = Orders();
  const arr = [];
  function createArrOrder(array) {
    array.forEach((element) => {
      arr.push(element);
    });

    return arr;
  }
  createArrOrder(orders);
  /* const [order, setOrder] = React.useState(ts);

    function findOrder(number) {

      setOrder(ts.find((ord) => (ord.nomber.toString() === number)));
    } */

  console.log(Object.keys(arr));

  return (
    <>
      <UserOrder allOrders={arr} />
      <Tabs />
    </>
  );
}
export default PrivateOffice;
