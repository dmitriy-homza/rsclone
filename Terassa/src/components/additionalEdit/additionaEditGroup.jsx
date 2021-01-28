import React from 'react';
import PropTypes from 'prop-types';
import { store } from 'react-notifications-component';
import { Button } from 'reactstrap';
import AdditionalElement from './additionalElement';
import 'firebase/database';

const AdditionEditGroup = ({
  groupName,
  groupElements,
  additionsObject,
  setAdditionsObject,
  isEdit,
  setIsEdit,
  writeNewAdditions,
}) => {
  function addNewAddition(inputObj) {
    const newAdditionObject = { ...inputObj };
    const newElement = {
      cost: '0',
      description: '...',
      img: 'additionals/empty.jpg',
      name: 'New additional',
      weight: '0 gr.',
      id: `${Date.now()}`,
    };
    newAdditionObject[groupName].push(newElement);
    setIsEdit(newAdditionObject[groupName][newAdditionObject[groupName].length - 1].id);
    writeNewAdditions(newAdditionObject);
  }
  return (
    <>
      <tr>
        <td colSpan="3">{groupName}</td>
        <td colSpan="2">
          <Button onClick={() => {
            if (!isEdit) {
              addNewAddition(additionsObject);
            } else {
              store.addNotification({
                title: 'Save changes!',
                message: 'Please save all changes you made.',
                type: 'warning',
                insert: 'top',
                container: 'top-right',
                animationIn: ['animate__animated animate__fadeIn'],
                animationOut: ['animate__animated animate__fadeOut'],
                dismiss: {
                  duration: 5000,
                },
              });
            }
          }}
          >
            New Addition
          </Button>
        </td>
      </tr>
      {groupElements.map((item, index) => (
        <AdditionalElement
          key={`key${item.id}`}
          name={item.name}
          weight={item.weight}
          img={item.img}
          description={item.description}
          cost={item.cost}
          groupName={groupName}
          elementIndex={index}
          additionsObject={additionsObject}
          setAdditionsObject={setAdditionsObject}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          writeNewAdditions={writeNewAdditions}
        />
      ))}
    </>
  );
};
AdditionEditGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  groupElements: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  additionsObject: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)))
    .isRequired,
  setAdditionsObject: PropTypes.func.isRequired,
  isEdit: PropTypes.string.isRequired,
  setIsEdit: PropTypes.func.isRequired,
  writeNewAdditions: PropTypes.func.isRequired,
};

export default AdditionEditGroup;
