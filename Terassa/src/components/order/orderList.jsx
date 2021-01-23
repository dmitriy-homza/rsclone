import React from 'react';
import PropTypes from 'prop-types';
import MenuDishes from './menuDishes';
// import OrderItem from './orderItem';

function OrderList({ vse }) {
  if (vse === undefined) {
    const vce = {
      name: 'Not exist',
    };
    const { name } = vce;
    return (
      <ul>
        <li>
          <span>
            <div>{name}</div>
          </span>
        </li>
      </ul>
    );
  }
  const {
    name, nomber, option, dishes,
  } = vse;

  return (
    <ul>
      <li>
        <div>
          <div>{name}</div>
          <span>{nomber}</span>
          <div>{option}</div>
          <section><MenuDishes dishes={dishes} /></section>
        </div>
      </li>
    </ul>
  );
}
OrderList.propTypes = {
  vse: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default OrderList;
