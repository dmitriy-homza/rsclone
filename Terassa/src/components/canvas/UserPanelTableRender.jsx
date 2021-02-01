/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import firebase from 'firebase/app';
import ButtonItem from './ButtonItem';
import UserTableRender from './UserTableRender';
import 'firebase/database';

const userPanelTableRender = () => {

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
         <div id="canvasWrapper">
            {fbData ? document.getElementById('canvasWrapper') ? (<UserTableRender bgImage={fbData.bgImage} fbData={fbData.tables}/>) : 'false' : 'false'}
         </div>
      </>
   );
};

export default userPanelTableRender;