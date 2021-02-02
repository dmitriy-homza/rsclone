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
  console.log(Order);
  const elementAdditions = Object.keys(additions);

  console.log('elementAdditions', elementAdditions);

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
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>

            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <h4>Tab 1 Contents</h4>
                  <Table>

                    <tbody>
                      <tr>
                        <td><span>Название</span></td>
                        <td><span>Цена </span></td>
                        <td><span>Вес</span></td>
                        <td><span>Время подачи к столу</span></td>
                      </tr>

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
