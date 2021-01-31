/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import ReactNotification, { store } from 'react-notifications-component';
import Layout from '../components/layout';
import Options from '../components/additional/options';
import Basket from '../components/additional/basket';

import '../styles/addition.scss';
import '../styles/book.scss';

export default () => {
  const [page, setPage] = useState('tables');

  let visitTime; let
    tables;

  function takeProps() {
    tables = 'Столы';
    visitTime = `${document.getElementById('date').value}T${document.getElementById('time').value}+03:00`;
  }
  const [selectedAdditional, addElement] = React.useState([]);
  function addAddition(element) {
    // eslint-disable-next-line no-param-reassign
    let isRepeat = false;
    element.id = `${selectedAdditional.length}`;
    selectedAdditional.forEach((item) => {
      if (item.name === element.name) {
        isRepeat = true;
        item.quantity += 1;
        item.time = [...item.time, element.time[0]];
      }
    });
    if (isRepeat) {
      addElement([...selectedAdditional]);
    } else {
      addElement([...selectedAdditional, element]);
    }
  }
  function removePosition(positionId) {
    let removeIndex = positionId;
    selectedAdditional.forEach((item, index) => {
      if (item.id === positionId) {
        removeIndex = index;
      }
    });
    selectedAdditional.splice(removeIndex, 1);
    const newArray = selectedAdditional.slice();
    addElement(newArray);
  }
  return page === 'tables' ? (
    <>
      <Layout>
        <ReactNotification />
        <main className="d-flex" />
        <input
          type="date"
          id="date"
          min="2018-01-01"
          max="2018-12-31"
        />
        <input
          type="time"
          id="time"
          name="appt"
          min="09:00"
          max="18:00"
          required
        />
        <button
          onClick={() => {
            if (document.getElementById('date').value && document.getElementById('time').value) {
              takeProps();
              setPage('additions');
            } else {
              store.addNotification({
                title: 'Choose time!',
                message: 'Choose a time to visit and book table',
                type: 'warning',
                insert: 'top',
                container: 'top-right',
                animationIn: ['animate__animated animate__fadeIn'],
                animationOut: ['animate__animated animate__fadeOut'],
                dismiss: {
                  duration: 3000,
                },
              });
            }
          }}
        >
          To additions
        </button>
      </Layout>
    </>
  )
    : (
      <>
        {' '}
        <Layout>
          <ReactNotification />
          <main className="d-flex flex-wrap">
            <section className="col-12 col-lg-9">
              <Options addAddition1={addAddition} />
            </section>
            <aside className="col-12 col-lg-3 basket-container">
              <Basket
                removePosition1={removePosition}
                key={selectedAdditional.length}
                checkPosition={selectedAdditional}
                visitTime={visitTime}
                tables={tables}
              />
            </aside>
          </main>
        </Layout>
      </>
    );
};
