/* eslint-disable */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

import img1 from '../../images/canvas/2personLittleTable.png'
import img2 from '../../images/canvas/2personTableChair.png'
import img3 from '../../images/canvas/2personTableSofa.png'
import img4 from '../../images/canvas/4personTableChairs.png'
import img5 from '../../images/canvas/4personTableSofas.png'
import img6 from '../../images/canvas/angleTable.png'

const ButtonItem = ({
  image, id, mode
}) => {
  // const [answer, setData] = useState(0);

  useEffect(() => {
    // const fetchData = async () => {
    //   const storage = firebase.storage();
    //   const storageRef = storage.ref();
    //   const imgURL = storageRef.child(`${image}`);
    //   // Get the download URL
    //   imgURL.getDownloadURL().then((result) => {
    //     setData(result);
    //   });
    // };
    // fetchData();
  }, []);



  const divStyle = {
    backgroundImage: `url('${image}')`,
  };

  return (
    <>
      <input
        type="radio"
        id={id}
        name="chooseMode"
        value={image}
        mode={mode}
        className="button-input"
        onChange={() => localStorage.setItem('currentMode', JSON.stringify(({ 'image': image, mode, id })))}
      />
      <label htmlFor={id} >
        <div className="chooseModeButton" style={divStyle} />
      </label>
    </>
  );
};

// localStorage.setItem('currentMode', JSON.stringify(({ 'image': answer, mode })))

export default ButtonItem;
