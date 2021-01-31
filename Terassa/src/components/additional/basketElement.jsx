import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle';

const basketElement = ({ position, remover }) => {
  function transformTimeArray(inputArray) {
    const array = inputArray.slice();
    array.sort();
    for (let index = 0; index < array.length; index += 1) {
      if (typeof (array[index]) === 'string') {
        array[index] = [1, array[index]];
      }
      if (index !== array.length - 1) {
        if (array[index][1] === array[index + 1]) {
          array[index][0] += 1;
          array.splice(index + 1, 1);
          index -= 1;
        }
      }
    }
    console.log('array: ', array);
    return array;
  }
  let quantityColor = 'brown';
  if (position.quantity === 2) {
    quantityColor = 'blue';
  } else if (position.quantity > 2) {
    quantityColor = 'green';
  }
  return (
    <div className="d-flex check-element mb-2">
      <div className={['check-element-quantity', quantityColor].join(' ')}>
        {position.quantity}
      </div>
      <div className="check-element-details">
        <h6 className={['mb-0', quantityColor].join(' ')}>{position.name}</h6>
        <div className="time-array">
          {
        transformTimeArray(position.time).map((item) => (
          <span key={item[1]} className="check-element-time">
            {item[0]}
            {' pc. at '}
            {item[1]}
            {'; '}
          </span>
        ))
      }
        </div>
        <span className="check-element-summary-cost">
          x
          {position.cost}
          =
          {(position.cost * position.quantity).toFixed(1)}
          {'$'}
        </span>
      </div>
      <Button
        close
        className="ml-auto"
        onClick={() => {
          remover(position.id);
        }}
      >
        <AiOutlineCloseCircle />
      </Button>
    </div>
  );
};

basketElement.propTypes = {
  // eslint-disable-next-line max-len
  remover: PropTypes.func.isRequired,
  position: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number,
    ])),
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number])).isRequired,
};

export default basketElement;
