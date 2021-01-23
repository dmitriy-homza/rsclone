import React from 'react';
import PropTypes from 'prop-types';
import BasketElement from './basketElement';

const Basket = ({ checkPosition }) => {
  let id = 1;
  return (
    <>
      <h2>Basket</h2>
      {checkPosition.map((item) => {
        id += 1;
        return (<BasketElement key={id} position={item} />);
      })}
    </>
  );
};

Basket.propTypes = {
  checkPosition: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default Basket;
