import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import AdditionGroup from './additionGroup';
import 'firebase/database';

const options = ({ addAddition1 }) => {
  const [answer, setData] = useState('error');

  useEffect(() => {
    const fetchData = async () => {
      const result = await firebase.database().ref('additionals').once('value').then((snapshot) => snapshot.val());
      setData(result);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="additional-wrapper d-flex flex-wrap">
        {typeof (answer) === 'object' ? Object.keys(answer).map((groupName) => (
          <AdditionGroup
            key={groupName}
            groupName={groupName}
            groupElements={Array.from(answer[groupName])}
            addAdditional2={addAddition1}
          />
        )) : 'false'}
      </div>
    </>
  );
};

options.propTypes = {
  addAddition1: PropTypes.func.isRequired,
};

export default options;
