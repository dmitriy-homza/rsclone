import React from 'react';
import ReactNotification from 'react-notifications-component';
import Layout from '../components/layout';
import Options from '../components/additional/options';
import Basket from '../components/additional/basket';
import '../styles/book.scss';

export default () => {
  const [selectedAdditional, addElement] = React.useState([]);
  function addAddition(element) {
    // eslint-disable-next-line no-param-reassign
    element.id = `${selectedAdditional.length}`;
    addElement([...selectedAdditional, element]);
  }

  return (
    <>
      <Layout>
        <ReactNotification />
        <main className="d-flex">
          <section className="col-12 col-sm-9">
            <Options addAddition1={addAddition} />
          </section>
          <aside className="col-12 col-sm-3">
            <Basket checkPosition={selectedAdditional} />
          </aside>
        </main>
      </Layout>
    </>
  );
};
