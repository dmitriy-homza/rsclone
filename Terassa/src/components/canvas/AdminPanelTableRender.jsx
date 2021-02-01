/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import firebase from 'firebase/app';
import ButtonItem from './ButtonItem';
import AdminTableRender from './AdminTableRender';
import 'firebase/database';

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
      <div>
        {fbData ? (<ButtonItem key={0} id={0} image={fbData.cursorImage} mode={'cursor'} />
        ) : 'help'}
        {fbData ? fbData.tables.map((el, ind) => (
          <ButtonItem key={ind + 1} id={el.id} image={el.image} mode={'create'}/>
        )) : 'Loading Data'}
      </div>
      <div id="canvasWrapper">
        {document.getElementById('canvasWrapper') ? (<AdminTableRender bgImage={fbData.bgImage} tableImages={fbData.tables} cursorImage={fbData.cursorImage}/>) : 'false'}
      </div>
    </>
  );
};

export default AdminPanelTableRender;
