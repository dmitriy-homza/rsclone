/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { Button } from 'reactstrap';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const AdditionalElement = ({
  groupElements1, name, weight, img, description, cost,
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

  const [isEdit, setIsEdit] = useState(false);
  const toggle = () => setIsEdit(!isEdit);

  const [editableName, setName] = useState(name);

  function handleChange(event) {
    setName(event.target.value);
    // eslint-disable-next-line no-param-reassign
    name = editableName;
    console.log(name);
    console.log(groupElements1);
  }

  return isEdit ? (
    <tr>
      <td>
        <textarea onChange={handleChange} rows="3" defaultValue={name} />
      </td>
      <td>
        <textarea rows="3">{description}</textarea>
      </td>
      <td>
        <textarea rows="3">{cost}</textarea>
      </td>
      <td>
        <textarea rows="3">{weight}</textarea>
      </td>
      <td>
        <img src={answer} width="30" alt="Additional" />
      </td>
      <td>
        <Button>Отправить</Button>
      </td>
    </tr>
  ) : (
    <>
      <tr
        onClick={() => {
          toggle();
        }}
      >
        <td>{name}</td>
        <td>{description}</td>
        <td>{cost}</td>
        <td>{weight}</td>
        <td>
          <img src={answer} width="30" alt="Additional" />
        </td>
      </tr>
    </>
  );
};

AdditionalElement.propTypes = {
  groupElements1: PropTypes.PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  name: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
};

export default AdditionalElement;
