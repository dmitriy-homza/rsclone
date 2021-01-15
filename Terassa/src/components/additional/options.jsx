import React from 'react';
import Card from './card';

export default () => (
  <>
    <div className="dishes">
      <h2>Dishes</h2>
      <div className="dishes-wrapper">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  </>
);
