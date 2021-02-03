import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/order.scss';
/* eslint linebreak-style: ["error", "windows"] */

function ServicesMenu({ servicesFromOrder }) {
  const {
    name, weight, cost, time, quantity,
  } = servicesFromOrder;

  return (
    <tr>
      <td><span>{name}</span></td>
      <td><span>{weight}</span></td>
      <td><span>{cost}</span></td>
      <td><span>{time}</span></td>
      <td><span>{quantity}</span></td>
    </tr>
  );
}

ServicesMenu.propTypes = {
  servicesFromOrder: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default ServicesMenu;
