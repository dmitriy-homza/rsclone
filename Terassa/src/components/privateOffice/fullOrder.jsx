import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,

  TabPane, Row, Col,
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import Display from './display';
import ShowOrderedTable from '../canvas/ShowOrderedTable';

// import { Row } from 'reactstrap';
// import { ListGroup } from 'reactstrap';

function FullOrder({ Order }) {
  console.log('Order: ', Order);
  const { tables, visit, additions } = Order;
  const elementAdditions = additions ? Object.keys(additions) : null;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const timeOfVisit = new Date(visit).toString();
  return (
    <>

      <tr onClick={toggle}>
        <td>
          {tables}
        </td>
        <td>
          {timeOfVisit}
        </td>
        {/* <Button color="danger" onClick={toggle}>{ buttonLabel }</Button> */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Ваш заказ</ModalHeader>
          <ModalBody>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <h4>Order Description</h4>
                  <Table>
                    <thead>
                      <tr>
                        <th><span>Name</span></th>
                        <th><span>Cost </span></th>
                        <th><span>Details</span></th>
                        <th><span>Delivery time </span></th>
                        <th><span>Servings</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {elementAdditions ? elementAdditions.map((element) => (
                        Array.from(additions[element]).map((service) => (
                          <Display display={service} key={service.name} />
                        ))
                      )) : (
                        <tr>
                          <td>{'You doesn\'t choose any additions'}</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </TabPane>
            <ShowOrderedTable tables={tables} />
          </ModalBody>
          <ModalFooter>

            <Button color="secondary" onClick={toggle}>Закрыть</Button>
          </ModalFooter>
        </Modal>
      </tr>
    </>

  );
}

FullOrder.propTypes = {
  Order: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default FullOrder;
