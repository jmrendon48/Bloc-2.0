import React, { useState } from "react";
import { Link } from 'react-router-dom';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Edit from "../Edit/index";

const ReviewList = ({ reviews }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const reload=()=>window.location.reload();

  if (!reviews.length) {
    return (
      <h1 className='pageText'>No Reviews Yet</h1>
    )
  }

  return (
    <>
      <div className="containter center">
        {reviews && reviews.map((review) => (
          <div key={review._id} className='row bloc-box'>
            <div className="title row">
              <div className='col-2'>
                <img src="{`${review.gameCoverUrl}`}"></img>
              </div>
            </div>
            <h3 className="bloc-box ml-3 col">
              <a className='review-title'>{review.title}</a>
            </h3>

            <div >
              <div className="col">
                <div className="col-9">
                  <h4 className='review-text'>{review.reviewBody}</h4>
                </div>
              </div>

              <div>
                {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                  <label>
                    <input 
                    type='radio' 
                    name='rating' 
                    value={review.rating} 
                    />
                    <FontAwesomeIcon className='star'
                      icon='star'
                      size='2x'
                      color= {review.rating ? '#ffc107' : '#e4e5e9'}
                    />
                  </label>
                )
                })}
                <h5> {review.rating}/5 Stars </h5>
              </div>
              <div className="meta row pl-3">
                <p className="username-link">
                  <Link
                    to={`/profile/${review.username}`}
                    style={{ fontWeight: 700 }}
                    className=""
                  >
                    {review.username}
                  </Link>{' '}
                  {review.createdAt} 
                </p>
              </div>
              <button onClick={() => setShowEditModal(true)}>
                <FontAwesomeIcon icon="plus-square" color="green" size="lg" />
                Edit your Bloc!
              </button>
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
                    reviewTitle = {review.title}
                    reviewBody = {review.reviewBody}
                    _id = {review._id}
                  />
                </Modal.Body>
              </Modal>
            </div>
          </div>
          
        ))}
      </div>
      
    </>              
  )
};

export default ReviewList;
