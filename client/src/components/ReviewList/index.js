import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ReviewList = ({ reviews }) => {

  if (!reviews.length) {
    return (
      <h1 className='pageText'>No Reviews Yet</h1>
    )
  }

  return (
    <div className="containter center">
      {reviews && reviews.map((review) => (
        <div key={review._id} className='row bloc-box'>
          <div className="title row">
            <div className='col-2'>
              <img src={`${review.gameCoverUrl}`}></img>
            </div>
          </div>

          <h3 className="bloc-box ml-3 col">
            <a className='review-title'>{review.title}</a>
          </h3>

          {/* <div>
            {[...Array(5)].map((star, i) => {
                <FontAwesomeIcon className='star'
                  icon='star'
                  size='2x'
                />
            })}
          </div> */}

          <div >
            <div className="col">
              <div className="col-9">
                <h4 className='review-text'>{review.reviewBody}</h4>
              </div>
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
          </div>

        </div>
      ))}
    </div>
  )
};

export default ReviewList;
