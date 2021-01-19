/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import AdditionGroup from './additionGroup';
// import additionals from './additional.json';
import 'firebase/database';

const options = () => {
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
          />
        )) : 'false'}
      </div>
    </>
  );
};

export default options;
