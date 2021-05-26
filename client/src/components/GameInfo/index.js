import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_GAME } from "../../utils/queries";
import { Modal, Image } from "react-bootstrap";
import ReviewForm from "../../components/ReviewForm/index";



function GameInfo(props) {
    const {gameId} = props;
    const { loading, data } = useQuery(QUERY_GAME, {
        variables: { gameId: gameId }
    })
    const [showReviewModal, setShowReviewModal] = useState(false);

    if (loading) {
        return <div>Loading...</div>;
    }
    console.log("data!!!!!!!!!!!!!!!!!", data.game.name);

    const reload = () => window.location.reload();


    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container banner row">
                <Image
                    src={data.game.coverUrl}
                    width={120}
                    height={120}
                    className="row rounded img-fluid"
                    alt={`The cover for ${data.game.name} and game id is ${data.game.gameId}`}
                />
                <h1 className="display-4 row col">
                    {data.game.name}
                </h1>
                <p className="banner col" >{data.game.summary}</p>
                <button className='btn btn-success ml-auto' onClick={() => setShowReviewModal(true)}>
                    <FontAwesomeIcon icon="pen-square" color="" size="lg" />  Write a New Bloc
                </button>
            </div>
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
                        gameTitle={data.game.name}
                        gameId={data.game.gameId}
                        gameCoverUrl={data.game.coverUrl}
                        setShowReviewModal={setShowReviewModal}
                    />
                </Modal.Body>
            </Modal>
        </div>

        // <h1>test</h1>
    );

}

export default GameInfo;