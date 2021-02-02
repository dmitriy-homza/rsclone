/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
// import Menudishes from '../order/menuDishes';
// import Options from '../order/options';
// import Time from './time';
// import { ListGroupItem } from 'reactstrap';
// import Modal from './modal';

function Display({ fromOrder }) {
  const { ...display } = fromOrder;
  const {
    cost, name, quantity, weigth,
  } = display;
  console.log(display);
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
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (

    <tr onClick={toggle}>

      <td>{name}</td>
      <td>{cost}</td>
      <td>{quantity}</td>
      <td>{weigth}</td>
      { /* transformTimeArray(time).map((timeElem) => (
        <Time
          timeElem={timeElem}
        />
      )) */}

      {/* <Button color="danger" onClick={toggle}>{ buttonLabel }</Button> */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>

          <td>{name}</td>

          <td>номер столика</td>
          <td>количество человек</td>

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
