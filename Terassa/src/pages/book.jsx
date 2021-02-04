/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import {
  Alert, Form, Col, Row, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import ReactNotification, { store } from 'react-notifications-component';
import firebase from 'firebase/app';
import Layout from '../components/layout';
import Options from '../components/additional/options';
import Basket from '../components/additional/basket';
import UserPanelTableRender from '../components/canvas/UserPanelTableRender';

import '../styles/addition.scss';
import '../styles/book.scss';

export default () => {
  const [page, setPage] = useState('tables');
  const [date, setDate] = useState('0');
  const [busyTables, setBusyTables] = useState('0');

  const [selectedAdditional, addElement] = React.useState([]);

  useEffect(() => {
    const load = async () => {
      const result = await firebase.database().ref(`busyTables/${new Date(document.getElementById('date').value).getDate()}-${new Date(document.getElementById('date').value).getMonth()}-${new Date(document.getElementById('date').value).getFullYear()}`).once('value').then((snapshot) => snapshot.val());
      setBusyTables(result);
    };
    load();
  }, [date]);

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
        <main className="first-book p-5 flex-column d-flex">
          <h2>Book:</h2>
          <section className="date-choose">
            <Alert color="primary">
              Please choose a time for your visit:
            </Alert>
            <Form>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="date">Date</Label>
                    <Input
                      type="date"
                      name="date"
                      id="date"
                      placeholder="date placeholder"
                      onChange={() => {
                        setDate(document.getElementById('date').value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="time">Time</Label>
                    <Input
                      type="time"
                      step="600"
                      name="time"
                      min="08:00"
                      max="22:00"
                      id="time"
                      placeholder="time placeholder"
                    />
                  </FormGroup>
                </Col>
                <Button
                  className="pl-3 mb-3 mt-4 ml-auto"
                  color="primary"
                  onClick={() => {
                    if (document.getElementById('date').value && document.getElementById('time').value) {
                      setPage({
                        tables: `${localStorage.getItem('choosenTable')}`,
                        visitTime: `${document.getElementById('date').value}T${
                          document.getElementById('time').value
                        }+03:00`,
                      });
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
                  Continue
                </Button>
              </Row>
            </Form>
          </section>
          <section>
            <Alert color="primary">
              And choose a table:
            </Alert>
          </section>
          <div className="d-flex justify-content-center"><UserPanelTableRender busyTables={busyTables || {}} /></div>
        </main>
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
                color="primary"
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
