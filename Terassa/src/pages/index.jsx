import React from 'react';
import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'reactstrap';

export default function Home() {
  return (
    <div>
      <h2 className="d-none">Hello world!</h2>
      <Alert color="primary">
        So, we have Reactstrap and Airbnb and prettier and SCSS!
      </Alert>
    </div>
  );
}
