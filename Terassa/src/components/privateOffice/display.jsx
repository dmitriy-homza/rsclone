import React from 'react';
import PropTypes from 'prop-types';
import Time from './time';
import Quantity from './quantity';

function Display({ display }) {
  const {
    cost, name, time, weight,
  } = display;

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
    return array;
  }

  return (
    <tr>
      <td>
        {' '}
        <span>{name}</span>
      </td>
      <td>
        {' '}
        <span>{`${cost}$`}</span>
      </td>
      <td>
        {' '}
        <span>{weight}</span>
      </td>
      <td>
        {transformTimeArray(time).map((timeElem) => (
          <Time
            timeElem={timeElem}

          />
        ))}
      </td>
      <td>
        {transformTimeArray(time).map((timeElem) => (
          <Quantity
            timeElem={timeElem}

          />
        ))}
      </td>
    </tr>
  );
}
Display.propTypes = {
  display: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Display;
