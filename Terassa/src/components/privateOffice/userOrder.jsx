import React, { useState } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col,
  Table,
} from 'reactstrap';
import classnames from 'classnames';
import Orders from '../order/orders';
import CurrentOrder from './currentOrder';

const UserOrder = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [...orders] = Orders();
  const arr = [];
  function createArrOrder(array) {
    array.forEach((element) => {
      arr.push(element);
    });
    return arr;
  }
  const [...ord] = createArrOrder(orders);
  const [order, setOrder] = React.useState(ord);

  function sorCurrenttOrder(date) {
    setOrder(ord.filter((elem) => (Date.parse(elem.date) < date)));
  }
  function sortFutureOrder(date) {
    setOrder(ord.filter((elem) => (Date.parse(elem.date) > date)));
  }
  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); sorCurrenttOrder(Date.now()); }}
          >
            Активные заказы
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); sortFutureOrder(Date.now()); }}
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
              <CurrentOrder orderList={order} />
              <Table hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <CurrentOrder orderList={order} />
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <h4>Tab 2 Contents</h4>
              <CurrentOrder orderList={order} />
              <Table hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <CurrentOrder orderList={order} />
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
