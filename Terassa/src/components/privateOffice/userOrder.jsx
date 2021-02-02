import React, { useState, useEffect } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col,
  Table,
} from 'reactstrap';
import classnames from 'classnames';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
// import Orders from '../order/orders';
import CurrentOrder from './currentOrder';

const UserOrder = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const order = {};

  const [answer, setData] = useState(order);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      const userId = user.uid;
      const fetchData = async () => {
        const result = await firebase.database().ref(`users/${userId}/orders`).once('value').then((snapshot) => snapshot.val());
        setData(result);
      };
      fetchData();
    });
  }, []);

  const pastOrders1 = [];
  const currentOrders1 = [];

  const keysOrders = Object.keys(answer);
  keysOrders.forEach((element) => {
    if (answer[element].visit < Date.now()) {
      pastOrders1.push(answer[element]);
    } else if (answer[element].visit > Date.now()) {
      currentOrders1.push(answer[element]);
    }
  });
  /* const [...orders] = Orders();
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
   } */
  // sortOrder();

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            <span>Активные заказы</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            <span> История заказов</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents</h4>
              <Table hover>

                <tbody>

                  {currentOrders1.length !== 0
                    ? <CurrentOrder orderList={currentOrders1} /> : <tr><td>Not</td></tr>}

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

                <tbody>
                  {pastOrders1.length !== 0
                    ? <CurrentOrder orderList={pastOrders1} /> : <tr><td>Not</td></tr>}
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
