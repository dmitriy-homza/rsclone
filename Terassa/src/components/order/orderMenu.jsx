import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/order.scss';
/* eslint linebreak-style: ["error", "windows"] */

function OrderMenu({ dishesFromOrder }) {
  // const { ...dishes } = dishesFromOrder;
  const {
    name, weigth, cost, time, quantity,
  } = dishesFromOrder;
  return (
    <>
      <section className="dishesItem">
        <div>{name}</div>
        <div>{weigth}</div>
        <div>{cost}</div>
        <div>{time}</div>
        <div>{quantity}</div>
      </section>

    </>
  );
}

OrderMenu.propTypes = {
  dishesFromOrder: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default OrderMenu;
