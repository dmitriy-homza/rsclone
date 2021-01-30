import React from 'react';
import PropTypes from 'prop-types';
// import { ListGroupItem } from 'reactstrap';

function Display({ fromOrder }) {
  const { ...display } = fromOrder;
  const { name, date, nomber } = display;
  return (
    <tr>
      <th scope="row">{nomber}</th>
      <td>{name}</td>
      <td>{date}</td>
    </tr>
  );
}
Display.propTypes = {
  fromOrder: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Display;
