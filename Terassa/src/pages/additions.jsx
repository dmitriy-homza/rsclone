/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import React from 'react';
import ReactNotification from 'react-notifications-component';
import Layout from '../components/layout';
import Options from '../components/additional/options';
import Basket from '../components/additional/basket';
import '../styles/addition.scss';

export default () => {
  const [selectedAdditional, addElement] = React.useState([]);
  function addAddition(element) {
    // eslint-disable-next-line no-param-reassign
    let isRepeat = false;
    element.id = `${selectedAdditional.length}`;
    selectedAdditional.forEach((item) => {
      if (item.name === element.name) {
        isRepeat = true;
        item.quantity += 1;
        item.time = [...item.time, element.time[0]];
      }
    });
    if (isRepeat) {
      addElement([...selectedAdditional]);
    } else {
      addElement([...selectedAdditional, element]);
    }
  }
  function removePosition(positionId) {
    let removeIndex = positionId;
    selectedAdditional.forEach((item, index) => {
      if (item.id === positionId) {
        removeIndex = index;
      }
    });
    selectedAdditional.splice(removeIndex, 1);
    const newArray = selectedAdditional.slice();
    addElement(newArray);
  }
  return (
    <>
      <Layout>
        <ReactNotification />
        <main className="d-flex flex-wrap">
          <section className="col-12 col-lg-9">
            <Options addAddition1={addAddition} />
          </section>
          <aside className="col-12 col-lg-3 basket-container">
            <Basket removePosition1={removePosition} key={selectedAdditional.length} checkPosition={selectedAdditional} />
          </aside>
        </main>
      </Layout>
    </>
  );
};
