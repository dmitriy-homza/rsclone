import React from 'react';
import PropTypes from 'prop-types';
import { VscDebugContinue } from '@react-icons/all-files/vsc/VscDebugContinue';
import { Button } from 'reactstrap';
import BasketElement from './basketElement';

const Basket = ({ removePosition1, checkPosition }) => {
  let id = 1;
  // eslint-disable-next-line max-len
  const totalCost = checkPosition.reduce(((sum, item) => sum + +item.cost * item.quantity), 0).toFixed(1);
  const totalClasses = checkPosition.length > 0 ? 'total-container not-empty' : 'total-container';
  return (
    <>
      <h2 className="pt-4">Basket</h2>
      <div className="basket-wrapper pt-2">
        {checkPosition.map((item) => {
          id += 1;
          return (<BasketElement key={id} position={item} remover={removePosition1} />);
        })}
      </div>
      <div className={totalClasses}>
        <span>
          {' '}
          {checkPosition.length > 0 ? `Total cost: ${totalCost}$` : 'Your basket is empty!' }
        </span>
        <Button>
          <VscDebugContinue />
          {' '}
          Continue
        </Button>
      </div>
    </>
  );
};

Basket.propTypes = {
  removePosition1: PropTypes.func.isRequired,
  checkPosition: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number]))).isRequired,
};

export default Basket;
