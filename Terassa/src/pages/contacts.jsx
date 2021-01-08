import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import '../styles/index.scss';

export default () => (
  <>
    <Helmet title="Terassa - Contacts" />
    <Layout>
      <h1>Contacts</h1>
    </Layout>
  </>
);
