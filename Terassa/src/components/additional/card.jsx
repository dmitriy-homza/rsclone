import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
} from 'reactstrap';

const card = ({
  name, weight, img, description, cost,
}) => (
  <div>
    <Card id={name}>
      <CardImg top width="100%" src={img} alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{weight}</CardSubtitle>
        <CardText>{description}</CardText>
        <div className="cost">{cost}</div>
        <input
          type="time"
          id="appt"
          name="appt"
          min="09:00"
          max="18:00"
          step="300"
          required
        />
        <Button>+</Button>
        <Button>-</Button>
      </CardBody>
    </Card>
  </div>
);

card.propTypes = {
  name: PropTypes.string,
  weight: PropTypes.string,
  img: PropTypes.string,
  description: PropTypes.string,
  cost: PropTypes.string,
};

export default card;
