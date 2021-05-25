import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ReviewList = ({ reviews }) => {
  if (!reviews.length) {
    return <h3>No Reviews Yet</h3>;
  }
  return (
    <div className="containter center">
      {reviews && reviews.map((review) => (
        <div key={review._id} className=' row bloc-box'>
          <div className="title row">
            <div className='col-2'>
              <img src="https://static.wikia.nocookie.net/heroe/images/c/c5/Main-qimg-eac60a09139338987351e61d3795e64f.jpeg.jpg/revision/latest/scale-to-width-down/602?cb=20210209155950"></img>
            </div>
          </div>
          <h3 className="bloc-box ml-3">
            <a className='review-title'>{review.title}</a>
          </h3>

          <div >
            <div className="row">
              <div className="col-9">
                <h4 className='review-text'>{review.reviewBody}</h4>
              </div>
            </div>

            <label>
              <input 
              type='radio' 
              name='rating' 
              value={review.rating} 
              />
              <FontAwesomeIcon className='star'
                icon='star'
                size='1x'
                color= '#e4e5e9'
              />
            </label>

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
