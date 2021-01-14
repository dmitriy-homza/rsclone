import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import Options from '../components/additional/options';
import '../styles/book.scss';

export default () => (
  <>
    <Helmet title="Terassa - Book" />
    <Layout>
      <main>
        <section>
          <Options />
        </section>
      </main>

    </Layout>
  </>
);
