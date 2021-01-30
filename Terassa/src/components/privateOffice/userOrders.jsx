import React from 'react';
import PropTypes from 'prop-types';

function UserOrders({ allOrders }) {
  const [...array] = allOrders;
  return (
    <div>{array.length}</div>
  );
}
UserOrders.propTypes = {
  allOrders:
   PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
};

export default UserOrders;
