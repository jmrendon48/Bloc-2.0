import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Jumbotron, Container, Col, Form, Button, Card } from "react-bootstrap";

const GamePage = (props) => {
  // const { name, coverId } = props.location.state
  const coverId = props.location.state.coverId;
  const name = props.location.state.name;
  const summary = props.location.state.summary;
  const first_release_date = props.location.state.first_release_date;

  return (
    <>
      <Container className="col-8">
        <Card border="dark">
            <Card.Img
              src={coverId}
              alt={`The cover for ${name}`}
              variant="top"
            />
          <Card.Title>
            {name} ({first_release_date})
          </Card.Title>
          <Card.Body>
            {summary}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default GamePage;
