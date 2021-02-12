import React from 'react';

import PropTypes from 'prop-types';

import FullOrder from './fullOrder';

function CurrentOrder({ orderList }) {
  const [...ord] = orderList;

  return (
    <>
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
