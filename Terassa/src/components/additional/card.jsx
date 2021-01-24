/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { store } from 'react-notifications-component';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
} from 'reactstrap';

const card = ({
  name, weight, img, description, cost, addAdditional3,
}) => {
  const [answer, setData] = useState('../../images/empty.jpg');

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
  const divStyle = {
    backgroundImage: `url('${answer}')`,
  };
  return (
    <div className="pt-3 col-md-4 col-sm-6 col-12">
      <Card id={name}>
        <div className="card-image" style={divStyle} />
        <CardBody className="d-flex flex-column">
          <CardTitle tag="h5">{name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{weight}</CardSubtitle>
          <CardText>{description}</CardText>
          <div className="cost mt-auto">{cost}</div>
          <div className="controld">
            <input
              type="time"
              id={weight}
              name="appt"
              min="09:00"
              max="18:00"
              step="300"
              required
            />
            <Button onClick={() => {
              if (!document.getElementById(`${weight}`).value) {
                store.addNotification({
                  title: 'Wonderful!',
                  message: 'teodosii@react-notifications-component',
                  type: 'warning',
                  insert: 'top',
                  container: 'top-right',
                  animationIn: ['animate__animated animate__fadeIn'],
                  animationOut: ['animate__animated animate__fadeOut'],
                  dismiss: {
                    duration: 5000,
                  },
                });
              } else {
                const positionObject = {
                  name,
                  weight,
                  cost,
                  time: [document.getElementById(`${weight}`).value],
                  quantity: 1,
                };
                addAdditional3(positionObject);
              }
            }}
            >
              +
            </Button>
          </div>
        </CardBody>
      </Card>

    </div>
  );
};

card.propTypes = {
  name: PropTypes.string,
  weight: PropTypes.string,
  img: PropTypes.string,
  description: PropTypes.string,
  cost: PropTypes.string,
  addAdditional3: PropTypes.func.isRequired,
};

export default card;
