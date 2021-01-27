/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AdditionalElement from './additionalElement';
import 'firebase/database';

const AdditionEditGroup = ({
  groupName,
  groupElements,
  additionsObject,
  setAdditionsObject,
  isEdit,
  setIsEdit,
}) => {
  return (
    <>
      <tr id={groupName}>
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
          isEdit={isEdit}
          setIsEdit={setIsEdit}
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
};

export default AdditionEditGroup;
