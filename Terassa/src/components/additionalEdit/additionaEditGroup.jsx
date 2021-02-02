import React from 'react';
import PropTypes from 'prop-types';
import { store } from 'react-notifications-component';
import { Button } from 'reactstrap';
import { AiOutlineAppstoreAdd } from '@react-icons/all-files/ai/AiOutlineAppstoreAdd';
import AdditionalElement from './additionalElement';
import 'firebase/database';
import '../../styles/admin-additions.scss';

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
      <tr className="category-name">
        <td colSpan="5">
          <div className="table-header">
            <h5>{groupName}</h5>
            <Button
              color="primary"
              className="btn-icon-split"
              onClick={() => {
                if (!isEdit) {
                  addNewAddition(additionsObject);
                  // eslint-disable-next-line no-undef
                  setTimeout(() => document.getElementById('editedElement').scrollIntoView({
                    behavior: 'smooth',
                  }), 500);
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
              <span className="icon text-white-50"><AiOutlineAppstoreAdd /></span>
              <span className="text">New Addition</span>
            </Button>
          </div>

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
