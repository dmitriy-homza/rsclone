import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from 'reactstrap';
import Layout from '../components/layout';
import '../styles/index.scss';

export default () => (
  <>
    <Helmet title="Terassa - Main Page" />
    <Layout>
      <main>
        <section className="hello col-12">
          <div className="hello-text">
            <h1 className="garamond">Terassa</h1>
            <h3>Lounge Restaraunt</h3>
            <div className="time">
              <p>Daily</p>
              <p>09:00 a.m. - 11.00 p.m.</p>
            </div>
          </div>
        </section>
        <section className="delicious-food">
          <div className="content-block">
            <Button color="primary">To order</Button>
          </div>
        </section>
        <section className="pleasant-env">
          <div className="content-block">
            <Button color="primary">To order</Button>
          </div>
        </section>
      </main>
    </Layout>
  </>
);
