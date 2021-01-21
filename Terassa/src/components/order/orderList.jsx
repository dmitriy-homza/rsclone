import React from 'react';
import PropTypes from 'prop-types';
// import OrderItem from './orderItem';

function OrderList({ vse }) {
  const { name, nomber } = vse;

  return (
    <ul>
      <li>
        <span>
          <div>{name}</div>
          <div>{nomber}</div>
        </span>
      </li>
    </ul>
  );
}
OrderList.propTypes = {
  vse: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default OrderList;
