import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
} from 'reactstrap';

export default () => (
  <>
    <Card>
      <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">Card title</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
        <CardText>make up the bulk of the cards content.</CardText>
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
  </>
);
