/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

import PropTypes from 'prop-types';
// import { ListGroupItem } from 'reactstrap';
// import Modal from './modal';

function Display({ fromOrder }) {
  const { ...display } = fromOrder;
  const { name, date, nomber } = display;

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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>
          {' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </tr>

  );
}
Display.propTypes = {
  fromOrder: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Display;
