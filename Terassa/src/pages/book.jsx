import React from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layout';
import '../styles/index.scss';

export default function Home() {
  return (
    <>
      <Helmet title="Terassa - Book" />
      <Layout>
        <h1>Book</h1>
      </Layout>
    </>
  );
}
