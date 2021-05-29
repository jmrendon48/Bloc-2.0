import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Edit from "../Edit/index";
import Auth from "../../utils/auth";

const ReviewList = ({ reviews, profileReviewEdit }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [passedInfo, setPassedInfo] = useState({});

  const reload = () => window.location.reload();

  if (!reviews.length) {
    return (
      <h1 className='pageText'>No Reviews Yet</h1>
    )
  }

  const handlePassInfo = (review) => {
    setPassedInfo(review);
    setShowEditModal(true);
    console.log(review);
   }
  
   console.log(passedInfo);
  return (
    <>
      <div className="containter center">

        {reviews && reviews.map((review, i) => (
          
          <div key={review._id} className='row bloc-box'>

            <div className='col-3'>
              <Link to={`/gamepage/${review.gameId}`}>
                <img src={`${review.gameCoverUrl}`}
                  fluid
                  thumbnail
                  width={200}
                />
              </Link>


              <Link to={`/gamepage/${review.gameId}`}>
                <h5 className='game-title'>{review.gameTitle}</h5>
              </Link>

            </div>

            <div className='col'>

              <h3 className='col'>
                <p className='review-title'>{review.title}</p>
              </h3>


              <div className="pl-3">
                <p className="username-link">
                  Written by: <Link
                    to={`/profile/${review.username}`}
                    style={{ fontWeight: 700 }}>
                    {review.username}
                  </Link>{' '} on {review.createdAt}
                </p>
              </div>

              <div>
                <div className="col-9">
                  <h4 className='review-text'>{review.reviewBody}</h4>
                </div>
              </div>

              <div className='col-9'>

                {[...Array(parseInt(`${review.rating}`))].map((star, i) => {
                  const ratingValue = i + 1;

                  return (
                    <label key={i}>
                      <input
                        type='radio'
                        name='rating'
                        value={review.rating}
                      />
                      <FontAwesomeIcon className='star'
                        icon='star'
                        size='lg'
                        color={review.rating ? '#ffc107' : '#e4e5e9'}
                      />
                    </label>

                  )
                })}
              </div>
              <p className='small-title'> {review.rating}/5 Stars </p>

            </div>

            <div>
              {Auth.loggedIn(), profileReviewEdit &&
                <div>
                  <Button variant="outline-warning" size='sm' onClick={() => handlePassInfo(review)}>
                    <FontAwesomeIcon icon="edit" color="#FEBE10" size="lg" />Edit</Button>{' '}
                </div>}
            </div>

          </div>

        ))}

        <div >
          <Modal
            size="lg"
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            onExit={reload}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Edit
                handleModalClose={() => setShowEditModal(false)}
                setShowEditModal={setShowEditModal}
                passedInfo={passedInfo}
              />
            </Modal.Body>
          </Modal>
        </div>
      </div>

    </>
  )
};

export default ReviewList;
