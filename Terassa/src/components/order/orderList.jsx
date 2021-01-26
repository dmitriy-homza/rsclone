import React from 'react';
import PropTypes from 'prop-types';
import MenuDishes from './menuDishes';
// import OrderItem from './orderItem';
import Options from './options';
import '../../styles/order.scss';

function OrderList({ vse }) {
  console.log(vse);
  if (vse.constructor.name === 'Array') {
    const vce = {
      name: 'Not exist',
    };
    const { name } = vce;
    return (
      <span>
        {name}
      </span>
    );
  }
  const {
    name, nomber, option, menu,
  } = vse;

  return (
    <ul>
      <li>
        <div className="orderList">
          <div>{name}</div>
          <span>{nomber}</span>
          {<Options option={option} />}
          {<MenuDishes menuItems={menu} />}
        </div>
      </li>
    </ul>
  );
}
OrderList.propTypes = {
  vse: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default OrderList;
