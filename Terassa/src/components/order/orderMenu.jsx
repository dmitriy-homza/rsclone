import React from 'react';
import PropTypes from 'prop-types';

function OrderMenu({ dishesFromOrder }) {
  // const { ...dishes } = dishesFromOrder;
  const {
    name, weigth, cost, time, quantity,
  } = dishesFromOrder;
  return (
    <>
      <div>{name}</div>
      <div>{weigth}</div>
      <div>{cost}</div>
      <div>{time}</div>
      <div>{quantity}</div>
    </>
  );
}

OrderMenu.propTypes = {
  dishesFromOrder: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default OrderMenu;
