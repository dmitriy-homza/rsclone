import React from 'react';
import {
  Row, Col,

} from 'reactstrap';
import PropTypes from 'prop-types';

function Options({ table }) {
  const { ...opt } = table;
  const { number, persons } = opt;
  return (
    <Row>
      <Col>{number}</Col>
      <Col>{persons}</Col>
    </Row>
  );
}
Options.propTypes = {
  table: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Options;
