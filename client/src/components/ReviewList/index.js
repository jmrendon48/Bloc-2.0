import React from "react";
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const ReviewList = ({ reviews }) => {

  if (!reviews.length) {
    return (
      <h1 className='pageText'>No Reviews Yet</h1>
    )
  }

  return (

    <div className="containter center">

      {reviews && reviews.map((review) => (

        <div key={review._id} className='row'>

          <div className='col-5'>

            <div>
              <img src={`${review.gameCoverUrl}`}></img>
            </div>

            {/* <Link
                    to={{
                      pathname: `/gamepage/${game.name}`
                    }}
                    style={{ fontWeight: 700 }}
                    className="text-dark"
                  /> */}
            
          </div>

          <div className='col'>

            <h3>
              <a className='review-title'>{review.title}</a>
            </h3>

            <div>
              <p className="username-link">
                <Link
                  to={`/profile/${review.username}`}
                  style={{ fontWeight: 700 }}
                >
                  {review.username}
                </Link>{' '}
                {review.createdAt}
              </p>
            </div>
          
              <div>
                <div >
                  <h4 className='review-text'>{review.reviewBody}</h4>
                </div>
              </div>
 
          </div>
        </div>
      ))}
    </div>
  )
};

export default ReviewList;
