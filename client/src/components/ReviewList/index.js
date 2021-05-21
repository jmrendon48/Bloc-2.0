import React from "react";

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
            <h4>by {review.username} on {review.createdAt}</h4>
          </div>
        </div>
      ))}
    </div>
  )
};

export default ReviewList;
