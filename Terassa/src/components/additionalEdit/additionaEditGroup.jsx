import React from 'react';
import PropTypes from 'prop-types';
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
        <td colSpan="4">{groupName}</td>
        <td>
          <Button onClick={() => {
            addNewAddition(additionsObject);
          }}
          />
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
