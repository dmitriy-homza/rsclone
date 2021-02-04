/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import firebase from 'firebase/app';
import 'firebase/database';
import { VscDebugContinue } from '@react-icons/all-files/vsc/VscDebugContinue';
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

import { saveData } from '../../core/api';

import BasketElement from './basketElement';

const Basket = ({
  removePosition1, checkPosition, visitTime, tables,
}) => {
  const isLoggedIn = !!firebase.auth().currentUser;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  let id = 1;
  // eslint-disable-next-line max-len
  const totalCost = checkPosition
    .reduce((sum, item) => sum + +item.cost * item.quantity, 0)
    .toFixed(1);
  const totalClasses = checkPosition.length > 0 ? 'total-container not-empty' : 'total-container';

  const [collapsed, setCollapsed] = useState(false);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const [numberOfOrder, setNumberOfOrder] = useState(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      const result = await firebase
        .database()
        .ref('lastOrder')
        .once('value')
        .then((snapshot) => snapshot.val());
      setNumberOfOrder(result);
      firebase
        .database()
        .ref('lastOrder')
        .set(result + 1);
    };
    fetchData();
  }, []);

  const onContinue = () => {
    toggle();
    const DBObject = {};
    DBObject.tables = tables;
    DBObject.visit = Date.parse(visitTime);
    DBObject.additions = {};
    checkPosition.forEach((element) => {
      // eslint-disable-next-line no-unused-expressions
      DBObject.additions[element.groupName] ? DBObject.additions[element.groupName] = [...DBObject.additions[element.groupName], element] : DBObject.additions[element.groupName] = [element];
    });
    saveData(`${numberOfOrder}`, DBObject);
  };

  return (
    <div
      className={[collapsed ? 'open' : '', checkPosition.length ? 'not-empty-check' : ''].join(' ')}
    >
      <h2 className="pt-4">Basket</h2>
      <button
        type="button"
        className="icon-open-mobile"
        onClick={() => {
          toggleNavbar();
        }}
      >
        <IoIosArrowUp />
      </button>
      <div className="basket-wrapper pt-2">
        {checkPosition.map((item) => {
          id += 1;
          return <BasketElement key={id} position={item} remover={removePosition1} />;
        })}
      </div>
      <div className={totalClasses}>
        <span>
          {' '}
          {checkPosition.length > 0 ? `Total cost: ${totalCost}$` : 'Your basket is empty!'}
        </span>
        <Button onClick={() => {
          onContinue();
          toggle();
        }}
        >
          <VscDebugContinue />
          {' '}
          Continue
        </Button>
      </div>
      <div>
        {isLoggedIn ? (
          <Modal backdrop="static" className="modal-without-close" keyboard={false} isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Order is processed</ModalHeader>
            <ModalBody>
              Your order number
              {' '}
              {<strong>{numberOfOrder}</strong>}
              {' '}
              is accepted!
              <br />
              You can clarify the details of the booking in your personal account.
            </ModalBody>
            <ModalFooter>
              <Button tag={Link} to="/" color="primary">To main page</Button>
            </ModalFooter>
          </Modal>
        ) : (
          <Modal backdrop="static" keyboard={false} className="modal-without-close" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Order is processed</ModalHeader>
            <ModalBody>
              Your order number
              {' '}
              {<strong>{numberOfOrder}</strong>}
              {' '}
              is accepted!
              <br />
              For details, enter the order number on the Orders page
            </ModalBody>
            <ModalFooter>
              <Button tag={Link} to="/" color="primary">To main page</Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    </div>
  );
};

Basket.propTypes = {
  removePosition1: PropTypes.func.isRequired,
  checkPosition: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string), PropTypes.number]),
    ),
  ).isRequired,
  visitTime: PropTypes.string.isRequired,
  tables: PropTypes.string.isRequired,
};

export default Basket;
