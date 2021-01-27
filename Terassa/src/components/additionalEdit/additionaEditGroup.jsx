/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import AdditionalElement from './additionalElement';
import 'firebase/database';

const AdditionEditGroup = ({ groupName, groupElements }) => {
  return (
    <>
      <tr>
        <td colSpan="5">{groupName}</td>
      </tr>
      {groupElements.map((item) => (
        <AdditionalElement
          groupElements1={groupElements}
          key={`key${item.name}`}
          name={item.name}
          weight={item.weight}
          img={item.img}
          description={item.description}
          cost={item.cost}
        />
      ))}
    </>
  );
};
AdditionEditGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  groupElements: PropTypes.PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default AdditionEditGroup;
