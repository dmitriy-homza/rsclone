import React from 'react';
import Layout from '../components/layout';
import Options from '../components/additional/options';
import Basket from '../components/additional/basket';
import '../styles/book.scss';

export default () => {
  const [selectedAdditional, addElement] = React.useState([]);

  function addAddition(element) {
    addElement(selectedAdditional.push(element));
    console.log(element, selectedAdditional);
  }

  return (
    <>
      <Layout>
        <main className="d-flex">
          <h2>{selectedAdditional[0]}</h2>
          <section className="col-12 col-sm-9">
            <Options addAddition1={addAddition} />
          </section>
          <aside className="col-12 col-sm-3">
            <Basket />
          </aside>
        </main>
      </Layout>
    </>
  );
};
