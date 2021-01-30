import React from 'react';
import PropTypes from 'prop-types';
import OrderMenu from './orderMenu';
import '../../styles/order.scss';
import ServicesMenu from './servicesMenu';

function MenuDishes({ additions }) {
  const { ...orderMenu } = additions;
  const { dishes, services } = orderMenu;

  return (
    <div className="dishesItem">
      {dishes.map((dishesFromOrder) => (
        <OrderMenu
          dishesFromOrder={dishesFromOrder}
          key={dishesFromOrder.id}
        />
      )) }
      {services.map((servicesFromOrder) => (
        <ServicesMenu
          servicesFromOrder={servicesFromOrder}
          key={servicesFromOrder.id}
        />
      )) }
    </div>
  );
}
MenuDishes.propTypes = {
  additions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default MenuDishes;
