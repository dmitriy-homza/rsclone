import React, { useState, useEffect } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col,
  Table,
} from 'reactstrap';
import classnames from 'classnames';
import firebase from './firebase';
import Orders from '../order/orders';
import CurrentOrder from './currentOrder';

const UserOrder = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const userId = firebase.auth().currentUser.uid;
  const [answer, setData] = useState('error');

  useEffect(() => {
    const fetchData = async () => {
      const result = await firebase.database().ref(`users/${userId}/orders`).once('value').then((snapshot) => snapshot.val());
      setData(result);
    };
    fetchData();
  }, []);
  console.log(answer);
  const [...orders] = Orders();
  const pastOrders = [];
  const currentOrders = [];

  function sortOrder() {
    orders.forEach((element) => {
      if (Date.parse(element.date) > Date.now()) {
        currentOrders.push(element);
      } else if (Date.parse(element.date) < Date.now()) {
        pastOrders.push(element);
      }
    });
    return (currentOrders, pastOrders);
  }
  sortOrder();
  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Активные заказы
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            История заказов
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents</h4>
              <Table hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <CurrentOrder orderList={currentOrders} />
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <h4>Tab 2 Contents</h4>
              <Table hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>

                  <CurrentOrder orderList={pastOrders} />

                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default UserOrder;
