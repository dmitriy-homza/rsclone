import React from 'react';
import {
  Row,

} from 'reactstrap';
import PropTypes from 'prop-types';
import OrderMenu from './orderMenu';
import '../../styles/order.scss';
import ServicesMenu from './servicesMenu';

function MenuDishes({ additions }) {
  const { ...orderMenu } = additions;
  const { dishes, services } = orderMenu;

  return (
    <>
      <thead>
        <Row>
          <th>Название блюда</th>
          <th>Вес</th>
          <th>Цена</th>
          <th>Количество порций</th>
        </Row>
      </thead>
      <tbody>
        {dishes.map((dishesFromOrder) => (
          <OrderMenu
            dishesFromOrder={dishesFromOrder}
            key={dishesFromOrder.id}
          />
        ))}
      </tbody>
      <thead>
        <Row>
          <th>Название блюда</th>
          <th>Вес</th>
          <th>Цена</th>
          <th>Количество порций</th>
        </Row>
      </thead>
      <tbody>
        {services.map((servicesFromOrder) => (
          <ServicesMenu
            servicesFromOrder={servicesFromOrder}
            key={servicesFromOrder.id}
          />
        ))}
      </tbody>
    </>
  );
}
MenuDishes.propTypes = {
  additions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default MenuDishes;
