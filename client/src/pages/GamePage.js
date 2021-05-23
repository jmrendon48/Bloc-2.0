import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useLocation } from "react-router-dom";
import { Jumbotron, Modal, Tab, Container, Col, Form, Button, Card } from "react-bootstrap";
import ReviewForm from "../components/ReviewForm/index";

const GamePage = (props) => {
  // const { name, coverId } = props.location.state
  const coverId = props.location.state.coverId;
  const name = props.location.state.name;
  const summary = props.location.state.summary;
  const first_release_date = props.location.state.first_release_date;

  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <>
      <Container className="col-8">
        <Card border="dark">
          <Card.Title>
            {name} ({first_release_date})
          </Card.Title>
          <Card.Img src={coverId} alt={`The cover for ${name}`} variant="top" />
          <Card.Body>{summary}</Card.Body>
          <Card.Link onClick={() => setShowReviewModal(true)}>
            <FontAwesomeIcon icon="plus-square" color="green" size="lg" /> Write a Bloc on this game!
          </Card.Link>
        </Card>
      </Container>
      {/* Add Review Modal */}
      <Modal
        size="lg"
        show={showReviewModal}
        onHide={() => setShowReviewModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">Add Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReviewForm handleModalClose={() => setShowReviewModal(false)} />
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default GamePage;
