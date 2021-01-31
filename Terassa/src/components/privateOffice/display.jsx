/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import Menudishes from '../order/menuDishes';
import Options from '../order/options';
// import { ListGroupItem } from 'reactstrap';
// import Modal from './modal';

function Display({ fromOrder }) {
  const { ...display } = fromOrder;
  const {
    name, date, nomber, additions, table,
  } = display;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (

    <tr onClick={toggle}>
      <th scope="row">
        {nomber}
      </th>
      <td>{name}</td>
      <td>{date}</td>

      {/* <Button color="danger" onClick={toggle}>{ buttonLabel }</Button> */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>

          <td>{name}</td>
          <td>{date}</td>
          <Menudishes additions={additions} />
          <tr>
            <td>номер столика</td>
            <td>количество человек</td>
          </tr>
          <tr>
            <Options table={table} />
          </tr>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Pедактировать заказ</Button>
          {' '}
          <Button color="secondary" onClick={toggle}>Закрыть</Button>
        </ModalFooter>
      </Modal>
    </tr>

  );
}
Display.propTypes = {
  fromOrder: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Display;
