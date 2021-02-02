import React from 'react';
import PropTypes from 'prop-types';

function Display({ display }) {
  const { cost } = display;
  console.log(cost);
  console.log(display);

  // const { cost } = elementsOrder;
  /* function transformTimeArray(inputArray) {
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
  } */

  return (
    <tr>
      <td>

        { /* transformTimeArray(time).map((timeElem) => (
        <Time
          timeElem={timeElem}
        />
      )) */}
        <span>{cost}</span>

      </td>
    </tr>
  );
}
Display.propTypes = {
  display: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Display;
