import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/order.scss';
import { ListGroup, ListGroupItem } from 'reactstrap';
/* eslint linebreak-style: ["error", "windows"] */

function OrderMenu({ dishesFromOrder }) {
  const {
    name, weight, cost, quantity,
  } = dishesFromOrder;
  console.log(dishesFromOrder);

  return (
    <ListGroup horizontal>
      <ListGroupItem>{name}</ListGroupItem>
      <ListGroupItem>{weight}</ListGroupItem>
      <ListGroupItem>{cost}</ListGroupItem>
      <ListGroupItem>{quantity}</ListGroupItem>

    </ListGroup>
  );
}

OrderMenu.propTypes = {
  dishesFromOrder: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default OrderMenu;
