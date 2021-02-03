/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import UserTableRender from './UserTableRender';
import { Spinner } from 'reactstrap';

const userPanelTableRender = ({
   setTable, busyTables
}) => {

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
               <div style={{ display: 'flex', flexDirection: 'row' }} >
                  <UserTableRender fbData={fbData.tables} setTable={setTable} busyTables={busyTables} />
                  <div>
                     <div id="tableInfo">
                     </div>
                  </div>
               </div>
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

export default userPanelTableRender;