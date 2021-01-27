/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import 'firebase/database';

const AdditionGroup = ({ groupName, groupElements, addAdditional2 }) => {
  return (
    <>
      <div className="additional-group pb-4 pt-4">
        <h2 className="pl-4 group-title mb-0">{groupName}</h2>
        <div className="additional-group-wrapper d-flex flex-wrap">
          {
              groupElements.map((item) => (
                <Card
                  key={`key${item.name}`}
                  name={item.name}
                  weight={item.weight}
                  img={item.img}
                  description={item.description}
                  cost={item.cost}
                  addAdditional3={addAdditional2}
                />
              ))
      }
        </div>

      </div>
    </>
  );
};
AdditionGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  groupElements: PropTypes.PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  addAdditional2: PropTypes.func.isRequired,
};

export default AdditionGroup;
