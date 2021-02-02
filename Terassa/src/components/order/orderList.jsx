/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Alert, TabPane, Row, Col,
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import BasketElement from '../additional/basketElement';
import MenuDishes from './menuDishes';
// import OrderItem from './orderItem';
import Options from './options';
import '../../styles/order.scss';

function OrderList({ order }) {
  const {
    additions, tables, visit,
  } = order;
  const time = new Date(visit).toString();
  return (
    <>
      <Alert color="success">
        Your order on
        {' '}
        <span>{time}</span>
        {' '}
        founded!
      </Alert>
      <h5>{tables}</h5>
      {Object.keys(additions).map((group) => (
        <>
          <h3>{group}</h3>
          {Array.from(additions[group]).map((element) => <BasketElement key={element.id} position={element} remover={() => {}} />)}
        </>
      ))}
      {/* <TabPane tabId="1">
        <Table>
          <thead>
            <Row>
              <Col>#</Col>
              <Col>Name</Col>
              <Col>Date</Col>
            </Row>
          </thead>
          <tbody>
            <Row>
              <Col>{nomber}</Col>
              <Col>{name}</Col>
              <Col>{date}</Col>
            </Row>
          </tbody>
          <tbody>
            <thead>
              <Row>
                <th>номер столика</th>
                <th>количество человек</th>
              </Row>
            </thead>
            <Options table={table} />
          </tbody>
          <tbody>
            <MenuDishes additions={additions} />
          </tbody>
        </Table>
      </TabPane> */}
    </>
  );
}
OrderList.propTypes = {
  order: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default OrderList;
