// eslint-disable jsx-props-no-spreading
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function useFindOrder(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);
  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(''),
    value: () => value,
  };
}

function FindOrder({ onCreate }) {
  const input = useFindOrder('');
  function submitHandler(event) {
    event.preventDefault();
    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    } else {
      onCreate('');
      input.clear();
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        placeholder="Order"
                // eslint-disable-next-line
                {...input.bind} // eslint-disable-line react/forbid-prop-types
      />
      <button type="submit" aria-label="find">Find Order</button>
    </form>

  );
}
FindOrder.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
export default FindOrder;
