import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_GAME } from "../../utils/queries";
import { Modal, Image } from "react-bootstrap";
import ReviewForm from "../../components/ReviewForm/index";



function GameInfo(props) {
    const { gameId } = props;
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
            <div className="container banner">

                <div className='row'>

                    <div className='col-3'>
                        <Image
                            src={`${data.game.coverUrl}`}
                            fluid
                            thumbnail
                            width = {300}
                            alt={`The cover for ${data.game.name} and game id is ${data.game.gameId}`}
                        />
                        
                    </div>

                    <div className='col'>
                        <h1 className="display-4">
                            {data.game.name}
                        </h1>
                        <div>
                            <p className="banner" >{data.game.summary}</p>
                        </div>
                        <button className='btn btn-success ml-auto' onClick={() => setShowReviewModal(true)}>
                            <FontAwesomeIcon icon="pen-square" size="lg" />  Write a New Bloc on {data.game.name}
                        </button>
                    </div>

                </div>
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