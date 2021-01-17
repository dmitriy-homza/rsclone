import React from 'react';
import Layout from '../components/layout';
import Options from '../components/additional/options';
import '../styles/book.scss';

export default () => (
  <>
    <Layout>
      <main className="d-flex">
        <section className="col-12 col-sm-9">
          <Options />
        </section>
        <aside className="col-12 col-sm-3">
          <div><h2>aside!</h2></div>
        </aside>
      </main>
    </Layout>
  </>
);
