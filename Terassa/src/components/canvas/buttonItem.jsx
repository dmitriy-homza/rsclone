/* eslint-disable */
import React, { useState, useEffect } from 'react';

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

  console.log(image)

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
