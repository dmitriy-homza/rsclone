import React from 'react';
import PropTypes from 'prop-types';
import Display from './display';
// import { Row } from 'reactstrap';
// import { ListGroup } from 'reactstrap';

function FullOrder({ Order }) {
  const { ...elements } = Order;
  const { additions, tables, visit } = elements;
  const elementAdditions = Object.keys(additions);
  console.log(additions);
  const { Dishes, Services } = additions;
  console.log(Services);
  console.log(Dishes);

  return (
    <>
      <tr>
        {tables}
      </tr>
      <tr>
        {visit}
      </tr>
      {elementAdditions.forEach((element) => {
        <Display fromOrder={additions[element]} />;
      })}
    </>
  );
}

FullOrder.propTypes = {
  Order: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default FullOrder;
