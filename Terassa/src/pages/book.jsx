import React from 'react';
import Layout from '../components/layout';
import Options from '../components/additional/options';
import '../styles/book.scss';

export default () => (
  <>
    <Layout>
      <main>
        <section>
          <Options />
        </section>
      </main>
      <aside>
        <div><h2>aside!</h2></div>
      </aside>

    </Layout>
  </>
);
