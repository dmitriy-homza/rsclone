/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Card from './card';
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
      <div className="dishes">
        <h2>Dishes</h2>
        <div className="dishes-wrapper d-flex flex-wrap">
          {answer ? Object.keys(answer).map((key) => (Array.from(answer[key])
            .map((item) => (
              <Card
                key={`key${item.weight}`}
                name={item.name}
                weight={item.weight}
                img={item.img}
                description={item.description}
                cost={item.cost}
              />
            ))
          )) : 'false'}
        </div>
      </div>
    </>
  );
};

export default options;
