import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
} from 'reactstrap';

const card = ({
  name, weight, img, description, cost,
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
              id="appt"
              name="appt"
              min="09:00"
              max="18:00"
              step="300"
              required
            />
            <Button>+</Button>
            <Button>-</Button>
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
};

export default card;
