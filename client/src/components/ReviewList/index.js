import React from "react";
import { Link } from 'react-router-dom';


const ReviewList = ({reviews}) => {
  if (!reviews.length) {
    return <h3>No Reviews Yet</h3>;
  }

  return (
    <div>
      {reviews && reviews.map((review) => (
        <div key={review._id}>
          <div className="title row">
            <h3 className="bloc-box ml-3">
              <a>{review.title}</a>
            </h3>
          </div>

          <div className="row">
            <div className="col-8">
              <h4>{review.reviewBody}</h4>
            </div>
          </div>
          
          <div className="meta row pl-3">
          <p className="card-header">
              <Link
                to={`/profile/${review.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {review.username}
              </Link>{' '}
                {review.createdAt}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
};

export default ReviewList;
