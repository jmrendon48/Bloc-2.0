import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@apollo/react-hooks";
import { GAME_SAVED } from "../utils/mutations"
import { QUERY_REVIEWGAME } from "../utils/queries";
import {
  Modal,
  Container,
  Image,
  Card
} from "react-bootstrap";
import ReviewForm from "../components/ReviewForm/index";
import ReviewList from "../components/ReviewList/index";

const GamePage = (props) => {
  const name = props.location.state.name
  const gameId = props.location.state.gameId;
  const coverUrl = props.location.state.coverUrl;
  const summary = props.location.state.summary;
  const first_release_date = props.location.state.first_release_date;

  const [showReviewModal, setShowReviewModal] = useState(false);

  const { loading, data } = useQuery(QUERY_REVIEWGAME, {
    variables: { gameTitle: name },
  });

  const reload = () => window.location.reload();

  if (loading) {
    return <div>Loading...</div>;
  }
  const reviews = data?.reviewGame || {};

  return (
    <div>
      <div class="jumbotron jumbotron-fluid">
        <div class="container banner row">
        <Image
              src={coverUrl}
              width={120}
              height={120}
              className="row rounded img-fluid"              
              alt={`The cover for ${name} and game id is ${gameId}`}
        />
          <h1 class="display-4 row col">
            {name}
          </h1>
          <p class="banner col" >{summary}</p>
          <button className='btn btn-success ml-auto' onClick={() => setShowReviewModal(true)}>
          <FontAwesomeIcon icon="pen-square" color="" size="lg" />  Write a New Bloc 
          </button>
        </div>
      </div>
      <>
        <Container className="col-8">
          <Card border="dark">

            
            <Card.Body></Card.Body>

          </Card>
        </Container>
        {loading ? <div>Loading...</div> : <ReviewList reviews={reviews} />}

        {/* Add Review Modal */}
        <Modal
          size="lg"
          show={showReviewModal}
          onHide={() => setShowReviewModal(false)}
          aria-labelledby="signup-modal"
          onExit={reload}
        >
          {/* tab container to do either signup or login component */}
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">Add Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReviewForm
              handleModalClose={() => setShowReviewModal(false)}
              gameTitle={name}
              gameCoverUrl={coverUrl}
              setShowReviewModal={setShowReviewModal}
            />
          </Modal.Body>
        </Modal>
      </>
    </div>
  );

};

export default GamePage;
