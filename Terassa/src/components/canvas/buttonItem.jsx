/* eslint-disable */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const button = ({
  key,  image
}) => {
  const [answer, setData] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const imgURL = storageRef.child(`${img}`);
      // Get the download URL
      imgURL.getDownloadURL().then((result) => {
        setData(result);
      });
    };
    fetchData();
  }, []);
  
  return (
    <>
      <label htmlFor={key}>
        <div className="button" style={`backgroundImage: url(${image})`}/>
      </label>
      <input 
        type="radio" 
        id={key}
        name="chooseMode"
        value="image"
      />
    </>
    // <div>
    //   <Card id={name}>
    //     <div className="card-image" style={divStyle} />
    //     <CardBody className="d-flex flex-column">
    //       <CardTitle tag="h5">{name}</CardTitle>
    //       <CardSubtitle tag="h6" className="mb-2 text-muted">{weight}</CardSubtitle>
    //       <CardText>{description}</CardText>
    //       <div className="cost mt-auto">{cost}</div>
    //       <div className="controld">
    //         <input
    //           type="time"
    //           id="appt"
    //           name="appt"
    //           min="09:00"
    //           max="18:00"
    //           step="300"
    //           required
    //         />
    //         <Button>+</Button>
    //         <Button>-</Button>
    //       </div>
    //     </CardBody>
    //   </Card>
    // </div>
  );
};

export default button;
