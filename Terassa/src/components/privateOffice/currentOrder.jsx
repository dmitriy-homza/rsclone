import React from 'react';

import PropTypes from 'prop-types';
// import { Row } from 'reactstrap';
// import { ListGroup } from 'reactstrap';
// import { TabContent } from 'reactstrap';
import FullOrder from './fullOrder';

function CurrentOrder({ orderList }) {
  const [...ord] = orderList;

  // const key = Object.keys(ord);
  // console.log(key);
  /* console.log(additions);
  const [Dishes, Services] = additions;
  console.log(Dishes);
  console.log(Services);
  const dishes = Object.keys(Dishes);
  const services = Object.keys(Services); */

  return (

    <>
      <tr>
        <td><span>Столик</span></td>
        <td><span>Date</span></td>
      </tr>
      {ord.map((Order) => (
        <FullOrder
          Order={Order}
          key={Order.visit}
        />
      ))}
    </>

  );
}
CurrentOrder.propTypes = {
  orderList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default CurrentOrder;
