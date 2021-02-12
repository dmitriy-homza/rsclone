/* eslint-disable */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


const ButtonItem = ({
  image, id, mode
}) => {

  useEffect(() => {

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
