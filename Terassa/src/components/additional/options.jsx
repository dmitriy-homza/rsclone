import React from 'react';
import Card from './card';
import additionals from './additional.json';

const options = () => (
  <>
    <div className="dishes">
      <h2>Dishes</h2>
      <div className="dishes-wrapper">
        {
          Object.keys(additionals).map((key) => (additionals[key].map((item) => (
            <Card
              name={item.name}
            />
          ))
          ))
 }
      </div>
    </div>
  </>
);

export default options;
