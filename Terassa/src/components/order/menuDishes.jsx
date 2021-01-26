import React from 'react';
import PropTypes from 'prop-types';
import OrderMenu from './orderMenu';
import '../../styles/order.scss';

// import OrderItem from './orderItem';
function MenuDishes({ menuItems }) {
  const [...orderMenu] = menuItems;
  return (
    <div className="dishesItem">
      {orderMenu.map((dishesFromOrder) => <OrderMenu dishesFromOrder={dishesFromOrder} />)}
    </div>
  );
}
MenuDishes.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default MenuDishes;
