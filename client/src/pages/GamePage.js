import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_REVIEWGAME } from "../utils/queries";
import {
  Jumbotron,
  Modal,
  Tab,
  Container,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import ReviewForm from "../components/ReviewForm/index";
import ReviewList from "../components/ReviewList/index";

const GamePage = (props) => {
  // const { name, coverId } = props.location.state
  const gameCoverUrl = props.location.state.coverId;
  const gameTitle = props.location.state.name;
  const summary = props.location.state.summary;
  const first_release_date = props.location.state.first_release_date;
  
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  const { loading, data } = useQuery(QUERY_REVIEWGAME, {
    variables: { gameTitle: gameTitle },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  const reviews = data?.reviewGame || {};

  return (
    <>
      <Container className="col-8">
        <Card border="dark">
          <Card.Title>
            {gameTitle} ({first_release_date})
          </Card.Title>
          <Card.Img src={gameCoverUrl} alt={`The cover for ${gameTitle}`} variant="top" />
          <Card.Body>{summary}</Card.Body>
          <Card.Link onClick={() => setShowReviewModal(true)}>
            <FontAwesomeIcon icon="plus-square" color="green" size="lg" /> Write
            a Bloc on this game!
          </Card.Link>
        </Card>
      </Container>
      {loading ? <div>Loading...</div> : <ReviewList reviews={reviews} />}

      {/* Add Review Modal */}
      <Modal
        size="lg"
        show={showReviewModal}
        onHide={() => setShowReviewModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Modal.Header closeButton>
          <Modal.Title id="signup-modal">Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReviewForm
            handleModalClose={() => setShowReviewModal(false)}
            gameTitle={gameTitle}
            gameCoverUrl={gameCoverUrl}
            setShowReviewModal={setShowReviewModal}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GamePage;
