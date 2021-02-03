/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/database';
import { VscDebugContinue } from '@react-icons/all-files/vsc/VscDebugContinue';
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp';
import { Button } from 'reactstrap';

import { saveData } from '../../core/api';

import BasketElement from './basketElement';

const Basket = ({
  removePosition1, checkPosition, visitTime, tables,
}) => {
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
        <Button onClick={onContinue}>
          <VscDebugContinue />
          {' '}
          Continue
        </Button>
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
