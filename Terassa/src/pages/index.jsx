import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from 'reactstrap';
import Layout from '../components/layout';
import '../styles/index.scss';

export default function Home() {
  return (
    <>
      <Helmet title="Terassa - Main Page" />
      <Layout>
        <section className="hello col-12">
          <div className="hello-text">
            <h1>Terassa</h1>
            <h3>Lounge Restaraunt</h3>
            <p>Daily</p>
            <p>09:00 a.m. - 11.00 p.m.</p>
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
      </Layout>
    </>
  );
}
