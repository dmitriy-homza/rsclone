/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';
import ButtonItem from './ButtonItem';
import AdminTableRender from './AdminTableRender';
import 'firebase/database';
import { Alert, Spinner } from 'reactstrap';
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
    <div className="first-book p-5 d-flex flex-column justify-content-center flex-grow-1">
      {typeof fbData === 'object' ? (
        <>
        <h2 className="align-center">Admin Panel</h2>
          <Alert color="primary">
            Choose <strong>Cursor</strong> button to move tables, or <strong>Table</strong> button to choose a table to be placed
          </Alert>
          <div className="admin-buttons d-flex justify-content-between">
            <div>
              <ButtonItem key={0} id={0} image={cursor} mode={'cursor'} />
            </div>
            <div>
              {fbData.tables.map((el, ind) => (
                <ButtonItem key={ind + 1} id={el.id} image={images[ind]} mode={'create'} />
              ))}
            </div>
          </div>
          <Alert> 
            Place the selected table on the restaurant plan
            <hr/>
            Press <kbd>LMB</kbd> on empty space to place the table. 
            Use <kbd><kbd>RMB</kbd> + <kbd>MouseScroll</kbd></kbd> to rotate the table
          </Alert>
          <AdminTableRender />
        </>
      ) : (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Spinner color="primary" />
            <span>Loading data...</span>
          </div>
        )}
    </div>
  );
};

export default AdminPanelTableRender;
