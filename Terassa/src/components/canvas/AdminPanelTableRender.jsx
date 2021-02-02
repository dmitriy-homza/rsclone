/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';
import ButtonItem from './ButtonItem';
import AdminTableRender from './AdminTableRender';
import 'firebase/database';
import { Spinner } from 'reactstrap';


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
    <>
      {typeof fbData === 'object' ? (
        <>
          <div>
            <ButtonItem key={0} id={0} image={fbData.cursorImage} mode={'cursor'} />
            {fbData.tables.map((el, ind) => (
              <ButtonItem key={ind + 1} id={el.id} image={el.image} mode={'create'} />
            ))}
          </div>
          <AdminTableRender bgImage={fbData.bgImage} tableImages={fbData.tables} cursorImage={fbData.cursorImage} />
        </>
      ) : (
          <>
            <Spinner color="primary" />
            <span>Loading data...</span>
          </>
        )}
    </>
  );
};

export default AdminPanelTableRender;
