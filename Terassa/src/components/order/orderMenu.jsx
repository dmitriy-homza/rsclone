import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/order.scss';
// import { ListGroup, ListGroupItem } from 'reactstrap';
/* eslint linebreak-style: ["error", "windows"] */

function OrderMenu({ dishesFromOrder }) {
  const {
    name, weight, cost, quantity,
  } = dishesFromOrder;
  return (
    <tr>
      <td>{name}</td>
      <td>{weight}</td>
      <td>{cost}</td>
      <td>{quantity}</td>
    </tr>
  );
}

OrderMenu.propTypes = {
  dishesFromOrder: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default OrderMenu;
