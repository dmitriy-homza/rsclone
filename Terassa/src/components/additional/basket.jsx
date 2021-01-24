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
  // eslint-disable-next-line max-len
  checkPosition: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number]))).isRequired,
};

export default Basket;
