import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import 'firebase/database';

const AdditionGroup = ({ groupName, groupElements }) => (
  <>
    <div className="additional-group">
      <h2>{groupName}</h2>
      <div className="additional-group-wrapper d-flex">
        {
              groupElements.map((item) => (
                <Card
                  key={`key${item.name}`}
                  name={item.name}
                  weight={item.weight}
                  img={item.img}
                  description={item.description}
                  cost={item.cost}
                />
              ))
      }
      </div>

    </div>
  </>
);
AdditionGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  groupElements: PropTypes.PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default AdditionGroup;
