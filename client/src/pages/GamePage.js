import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Jumbotron, Container, Col, Form, Button, Card } from "react-bootstrap";

const GamePage = ( clickedGameData ) => {
  console.log(clickedGameData);

  return (
    <>
      <Container className="col-8">
        <Card>
          <p>{clickedGameData.location.state.name}</p>
        </Card>
      </Container>
    </>
  );
};

export default GamePage;
