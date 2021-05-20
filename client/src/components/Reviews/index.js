import React from "react";
import { Link } from "react-router-dom";

const Reviews = (reviews) => {
  if (!reviews.length) {
    return <h3>No Reviews Yet</h3>;
  }

  return (
    <div>
      {reviews && reviews.map((review) => (
        <div key={review._id}>
          <div class="title row">
            <h3 class="bloc-box ml-3">
              <a href="">{review.title}</a>
            </h3>
          </div>

          <div class="row">
            <div class="col">
              <img src={review.image} alt=""></img>
            </div>
            <div class="col-8">
              <h4>{review.description}</h4>
            </div>
          </div>
          
          <div class="meta row pl-3">
            <h4>by {review.authors} on {review.createdAt}</h4>
          </div>
        </div>
      ))};
    </div>
  )
};

