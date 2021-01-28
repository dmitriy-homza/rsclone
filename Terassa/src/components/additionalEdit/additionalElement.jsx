/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { Button } from 'reactstrap';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const AdditionalElement = ({
  name,
  weight,
  img,
  description,
  cost,
  groupName,
  elementIndex,
  additionsObject,
  setAdditionsObject,
  isEdit,
  setIsEdit,
  writeNewAdditions,
}) => {
  const [imageUrl, setData] = useState('../../images/empty.jpg');

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

  const newAdditionObject = { ...additionsObject };

  function handleChange(event, prop) {
    newAdditionObject[groupName][elementIndex][prop] = event.target.value;
  }

  function uploadNewImage() {
    const file = document.getElementById('new-image').files[0];
    const type = file.name.split('.')[1];
    const fileName = `${Date.now()}.${type}`;
    newAdditionObject[groupName][elementIndex].img = `additionals/${fileName}`;
    const ref = firebase.storage().ref(`additionals/${fileName}`);
    ref.put(file).then(() => {
      console.log('картинка отправилась');
      newAdditionObject[groupName][elementIndex].id = `${Date.now()}`;
      setAdditionsObject(newAdditionObject);
      writeNewAdditions(newAdditionObject);
      setIsEdit('');
    });
  }

  return isEdit === `${newAdditionObject[groupName][elementIndex].id}` ? (
    <tr>
      <td>
        <textarea
          defaultValue={newAdditionObject[groupName][elementIndex].name}
          onChange={(event) => handleChange(event, 'name')}
          rows="1"
        />
      </td>
      <td>
        <textarea
          defaultValue={newAdditionObject[groupName][elementIndex].description}
          onChange={(event) => handleChange(event, 'description')}
          rows="3"
        />
      </td>
      <td>
        <textarea
          defaultValue={newAdditionObject[groupName][elementIndex].cost}
          onChange={(event) => handleChange(event, 'cost')}
          rows="1"
        />
      </td>
      <td>
        <textarea
          defaultValue={newAdditionObject[groupName][elementIndex].weight}
          onChange={(event) => handleChange(event, 'weight')}
          rows="1"
        />
      </td>
      <td>
        <input type="file" id="new-image" />
      </td>
      <td>
        <Button
          onClick={() => {
            if (document.getElementById('new-image').files[0]) {
              uploadNewImage();
            } else {
              newAdditionObject[groupName][elementIndex].id = `${Date.now()}`;
              setAdditionsObject(newAdditionObject);
              writeNewAdditions(newAdditionObject);
              setIsEdit('');
            }
          }}
        >
          Отправить
        </Button>
      </td>
      <td>
        <Button
          onClick={() => {
            newAdditionObject[groupName].splice(elementIndex, 1);
            if (!newAdditionObject[groupName][0]) {
              delete newAdditionObject[groupName];
            }
            setAdditionsObject(newAdditionObject);
            writeNewAdditions(newAdditionObject);
            setIsEdit('');
          }}
        >
          Удалить
        </Button>
      </td>
    </tr>
  ) : (
    <>
      <tr onClick={() => setIsEdit(newAdditionObject[groupName][elementIndex].id)}>
        <td>{name}</td>
        <td>{description}</td>
        <td>{cost}</td>
        <td>{weight}</td>
        <td>
          <img src={imageUrl} width="30" alt="Additional" />
        </td>
      </tr>
    </>
  );
};

AdditionalElement.propTypes = {
  name: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  elementIndex: PropTypes.number.isRequired,
  additionsObject: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)))
    .isRequired,
  setAdditionsObject: PropTypes.func.isRequired,
  isEdit: PropTypes.string.isRequired,
  setIsEdit: PropTypes.func.isRequired,
  writeNewAdditions: PropTypes.func.isRequired,
};

export default AdditionalElement;
