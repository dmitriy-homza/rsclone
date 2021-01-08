import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import '../styles/index.scss';

export default () => (
  <>
    <Helmet title="Terassa - Book" />
    <Layout>
      <h1>Book</h1>
    </Layout>
  </>
);
