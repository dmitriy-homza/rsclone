/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { RiSave3Fill } from '@react-icons/all-files/ri/RiSave3Fill';
import { MdDeleteForever } from '@react-icons/all-files/md/MdDeleteForever';
import { FiDownload } from '@react-icons/all-files/fi/FiDownload';
import { BsCardImage } from '@react-icons/all-files/bs/BsCardImage';
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
    const type = document.getElementById('new-image').files[0] ? file.name.split('.')[1] : '.jpg';
    const fileName = `${Date.now()}.${type}`;
    newAdditionObject[groupName][elementIndex].img = `additionals/${fileName}`;
    const ref = firebase.storage().ref(`additionals/${fileName}`);
    ref.put(file).then(() => {
      newAdditionObject[groupName][elementIndex].id = `${Date.now()}`;
      setAdditionsObject(newAdditionObject);
      writeNewAdditions(newAdditionObject);
      setIsEdit('');
    });
  }

  return isEdit === `${newAdditionObject[groupName][elementIndex].id}` ? (
    <tr id="editedElement" className="edit-element">
      <td className="title">
        <textarea
          defaultValue={newAdditionObject[groupName][elementIndex].name}
          onChange={(event) => handleChange(event, 'name')}
          rows="1"
        />
      </td>
      <td className="description">
        <textarea
          className="description-input"
          defaultValue={newAdditionObject[groupName][elementIndex].description}
          onChange={(event) => handleChange(event, 'description')}
        />
      </td>
      <td className="cost">
        <textarea
          defaultValue={newAdditionObject[groupName][elementIndex].cost}
          onChange={(event) => handleChange(event, 'cost')}
          rows="1"
        />
      </td>
      <td className="weight">
        <textarea
          defaultValue={newAdditionObject[groupName][elementIndex].weight}
          onChange={(event) => handleChange(event, 'weight')}
          rows="1"
        />
      </td>
      <td className="image">
        <label htmlFor="new-image">
          <div id="upload-container">
            <div className="d-flex">
              <FiDownload id="isReady" />
              <BsCardImage id="isSelected" className="d-none" />
              <input
                type="file"
                id="new-image"
                onChange={() => {
                  if (document.getElementById('new-image').files[0]) {
                    document.getElementById('isReady').classList.add('d-none');
                    document.getElementById('isSelected').classList.remove('d-none');
                  }
                }}
              />
            </div>
          </div>
        </label>
      </td>
      <td className="control-buttons">
        <Button
          color="success"
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
          <RiSave3Fill />
        </Button>
      </td>
      <td className="control-buttons">
        <Button
          color="danger"
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
          <MdDeleteForever />
        </Button>
      </td>
    </tr>
  ) : (
    <>
      <tr className="category-element" onClick={() => setIsEdit(newAdditionObject[groupName][elementIndex].id)}>
        <td className="title">{name}</td>
        <td className="description">{description}</td>
        <td className="cost">{cost}</td>
        <td className="weight">{weight}</td>
        <td className="image">
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
