import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,

  TabPane, Row, Col,
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import Display from './display';

// import { Row } from 'reactstrap';
// import { ListGroup } from 'reactstrap';

function FullOrder({ Order }) {
  const { tables, visit, additions } = Order;
  const elementAdditions = Object.keys(additions);
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
                  <h4>Описание заказа</h4>
                  <Table>
                    <thead>
                      <tr>
                        <th><span>Название</span></th>
                        <th><span>Цена </span></th>
                        <th><span>Детали</span></th>
                        <th><span>Время подачи </span></th>
                        <th><span>Количество блюд</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {elementAdditions.map((element) => (
                        Array.from(additions[element]).map((service) => (
                          <Display display={service} key={service.name} />
                        ))
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </TabPane>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Pедактировать заказ</Button>
            {' '}
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
