/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import AdditionalElement from './additionalElement';
import 'firebase/database';

const AdditionEditGroup = ({ groupName, groupElements, additionsObject, setAdditionsObject }) => {
  return (
    <>
      <tr>
        <td colSpan="5">{groupName}</td>
      </tr>
      {groupElements.map((item, index) => (
        <AdditionalElement
          key={`key${item.name}`}
          name={item.name}
          weight={item.weight}
          img={item.img}
          description={item.description}
          cost={item.cost}
          groupName={groupName}
          elementIndex={index}
          additionsObject={additionsObject}
          setAdditionsObject={setAdditionsObject}
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
};

export default AdditionEditGroup;
