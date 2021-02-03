/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { store } from 'react-notifications-component';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import {
  Tooltip, Card, CardText, CardBody, CardTitle, CardSubtitle, Button,
} from 'reactstrap';
import { GrAddCircle } from '@react-icons/all-files/gr/GrAddCircle';

const card = ({
  name, weight, img, description, cost, id, addAdditional3, groupName,
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
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <div className="pt-3 col-md-4 col-sm-6 col-12">
      <Card id={name}>
        <div className="card-image" style={divStyle} />
        <CardBody className="d-flex flex-column">
          <CardTitle tag="h5">{name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {weight}
          </CardSubtitle>
          <CardText>{description}</CardText>
          <div className="d-flex justify-content-between control mt-auto">
            <div className="cost">
              {cost}
              $
            </div>

            <input
              type="time"
              id={['id', id].join('')}
              name="appt"
              min="09:00"
              max="18:00"
              step="300"
              required
            />
            <Tooltip
              placement="top"
              isOpen={tooltipOpen}
              target={['id', id].join('')}
              toggle={toggle}
            >
              {' '}
              Choose a time to provide the service!
            </Tooltip>
            <Button
              onClick={() => {
                if (!document.getElementById(`${['id', id].join('')}`).value) {
                  store.addNotification({
                    title: 'Choose time!',
                    message: 'Choose a time to provide the service',
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
                    time: [document.getElementById(`${['id', id].join('')}`).value],
                    quantity: 1,
                    groupName,
                  };
                  addAdditional3(positionObject);
                }
              }}
            >
              <GrAddCircle />
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
  id: PropTypes.string,
  addAdditional3: PropTypes.func.isRequired,
  groupName: PropTypes.string,
};

export default card;
