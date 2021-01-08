import React from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layout';
import '../styles/index.scss';

export default () => (
  <>
    <Helmet title="Terassa - Account" />
    <Layout>
      <h1>Account</h1>
    </Layout>
  </>
);
