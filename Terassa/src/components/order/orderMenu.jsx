import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/order.scss';
/* eslint linebreak-style: ["error", "windows"] */

function OrderMenu({ dishesFromOrder }) {
  const {
    name, weight, cost, quantity,
  } = dishesFromOrder;
  console.log(dishesFromOrder);

  return (
    <ul className="dishesItem">
      <li><span>{name}</span></li>
      <li><span>{weight}</span></li>
      <li><span>{cost}</span></li>
      <li><span>{quantity}</span></li>
    </ul>
  );
}

OrderMenu.propTypes = {
  dishesFromOrder: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default OrderMenu;
