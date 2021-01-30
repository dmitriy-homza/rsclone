import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/order.scss';
/* eslint linebreak-style: ["error", "windows"] */

function ServicesMenu({ servicesFromOrder }) {
  const {
    name, weight, cost, time, quantity,
  } = servicesFromOrder;
  console.log(servicesFromOrder);
  console.log(name, weight, cost, time, quantity);

  return (
    <ul className="dishesItem">
      <li><span>{name}</span></li>
      <li><span>{weight}</span></li>
      <li><span>{cost}</span></li>
      <li><span>{time}</span></li>
      <li><span>{quantity}</span></li>
    </ul>
  );
}

ServicesMenu.propTypes = {
  servicesFromOrder: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default ServicesMenu;
