import React from 'react';
import PropTypes from 'prop-types';
// import OrderItem from './orderItem';
function MenuDishes({ dishes }) {
  const { ...Orderdishes } = dishes;
  const { fist, second, drink } = Orderdishes;

  return (
    <div>
      <div>
        {fist}
      </div>
      <div>
        {second}
      </div>
      <div>
        {drink}
      </div>
    </div>
  );
}
MenuDishes.propTypes = {
  dishes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default MenuDishes;
