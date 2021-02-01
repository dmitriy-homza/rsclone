/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import ReactNotification, { store } from 'react-notifications-component';
import { FormGroup, Label, Input } from 'reactstrap';
import Layout from '../components/layout';
import Options from '../components/additional/options';
import Basket from '../components/additional/basket';
import UserPanelTableRender from '../components/canvas/UserPanelTableRender';

import '../styles/addition.scss';
import '../styles/book.scss';

export default () => {
  const [page, setPage] = useState('tables');

  const [table, setTable] = useState('0');

  const blockedTables = [1612197355808, 1612197359103, 1612197400830, 1612197348936];

  let visitTime;
  let tables;

  function takeProps() {
    tables = 'Столы';
    visitTime = `${document.getElementById('date').value}T${
      document.getElementById('time').value
    }+03:00`;
    console.log(tables, visitTime);
    console.log(table);
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
        <main className="first-book d-flex" />
        <section className="date-choose">
          <h2>Please choose a time for your visit</h2>
          <FormGroup>
            <Label for="date">Date</Label>
            <Input
              type="date"
              name="date"
              id="date"
              placeholder="date placeholder"
              // onChange={() => setTime({ date: `${document.getElementById('date').value}` })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="time">Time</Label>
            <Input
              type="time"
              name="time"
              id="time"
              placeholder="time placeholder"
            />
          </FormGroup>
        </section>
        <button
          onClick={() => {
            if (document.getElementById('date').value && document.getElementById('time').value) {
              setPage({
                tables: table,
                visitTime: `${document.getElementById('date').value}T${
                  document.getElementById('time').value
                }+03:00`,
              });
              takeProps();
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
        <UserPanelTableRender setTable={setTable} blockedTables={blockedTables} />
      </Layout>
    </>
  )
    : (
      <>
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
                visitTime={page.visitTime}
                tables={page.tables}
              />
            </aside>
          </main>
        </Layout>
      </>
    );
};
