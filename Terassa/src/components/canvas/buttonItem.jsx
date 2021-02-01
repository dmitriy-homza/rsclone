/* eslint-disable */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const ButtonItem = ({
  image, id, mode
}) => {
  const [answer, setData] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const imgURL = storageRef.child(`${image}`);
      // Get the download URL
      imgURL.getDownloadURL().then((result) => {
        setData(result);
      });
    };
    fetchData();
  }, []);

  const divStyle = {
    backgroundImage: `url('${answer}')`,
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
        onChange={() => localStorage.setItem('currentMode', JSON.stringify(({ 'image': answer, mode, id })))}
      />
      <label htmlFor={id} >
        <div className="chooseModeButton" style={divStyle} />
      </label>
    </>
  );
};

// localStorage.setItem('currentMode', JSON.stringify(({ 'image': answer, mode })))

export default ButtonItem;
