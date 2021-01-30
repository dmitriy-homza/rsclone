import React from 'react';
import PropTypes from 'prop-types';
// import { ListGroup } from 'reactstrap';
import Display from './reflect';

function CurrentOrder({ orderList }) {
  const [...ord] = orderList;

  return (
    <>
      {ord.map((fromOrder) => (
        <Display
          fromOrder={fromOrder}
        />
      ))}
    </>
  );
}
CurrentOrder.propTypes = {
  orderList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default CurrentOrder;
