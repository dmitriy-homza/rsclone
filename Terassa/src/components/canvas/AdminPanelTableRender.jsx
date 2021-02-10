/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';
import ButtonItem from './ButtonItem';
import AdminTableRender from './AdminTableRender';
import 'firebase/database';
import { Spinner } from 'reactstrap';
import cursor from '../../images/canvas/cursor.png'

function importAll(r) {
  return r.keys().map(r)
}

const images = importAll(require.context('../../images/canvas/', false, /\.(png|jpe?g|svg)$/));
console.log(images)

const AdminPanelTableRender = () => {
  const [fbData, setfbData] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await firebase.database().ref('CanvasPreset').once('value').then((snapshot) => snapshot.val());
      setfbData(result);
    };
    fetchData();
  }, []);

  return (
    <section className="d-flex flex-column justify-content-center flex-grow-1">
      {typeof fbData === 'object' ? (
        <>
          <div className="admin-buttons d-flex justify-content-center">
            <ButtonItem key={0} id={0} image={cursor} mode={'cursor'} />
            {fbData.tables.map((el, ind) => (
              <ButtonItem key={ind + 1} id={el.id} image={images[ind]} mode={'create'} />
            ))}
          </div>
          <AdminTableRender />
        </>
      ) : (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Spinner color="primary" />
            <span>Loading data...</span>
          </div>
        )}
    </section>
  );
};

export default AdminPanelTableRender;
