import React from 'react';
import PropTypes from 'prop-types';
import MenuDishes from './menuDishes';
// import OrderItem from './orderItem';
import Options from './options';
import '../../styles/order.scss';

function OrderList({ vse }) {
  const {
    name, nomber, option, menu,
  } = vse;

  return (
    <div className="orderList">
      <div>{name}</div>
      <span>{nomber}</span>
      {<Options option={option} />}
      {<MenuDishes menuItems={menu} />}
    </div>
  );
}
OrderList.propTypes = {
  vse: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default OrderList;
