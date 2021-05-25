import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
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
import { EDIT_REVIEW } from "../../utils/mutations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Edit = ({ reviewTitle, reviewBody }) => {
  const [editReview] = useMutation(EDIT_REVIEW);

  const [title, setTitle] = useState("");
  const [titleCharacterCount, setTitleCharacterCount] = useState(0);

  const [editBody, setEditBody] = useState("");
  const [reviewBodyCharacterCount, SetReviewBodyCharacterCount] = useState(0);

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleTitleChange = (event) => {
    if (event.target.value.length <= 30) {
      setTitle(event.target.value);
      setTitleCharacterCount(event.target.value.length);
    }
  };

  const handleReviewBodyChange = (event) => {
    if (event.target.value.length <= 1000) {
      setEditBody(event.target.value);
      SetReviewBodyCharacterCount(event.target.value.length);
    }
  };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     // add thought to database
  //     await editReview({
  //       variables: { title, gameTitle, gameCoverUrl, reviewBody, rating },
  //     });

  //     // clear form value
  //     setTitle("");
  //     setTitleCharacterCount(0);
  //     setReviewBody("");
  //     SetReviewBodyCharacterCount(0);
  //     setShowEditModal(false);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const StarRating = () => {
    return (
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label>
              <input 
                type='radio' 
                name='rating' 
                value={ratingValue} 
                onClick={() => setRating(ratingValue)}
              />
              <FontAwesomeIcon className='star'
                icon='star'
                size='2x'
                color= {ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          )
        })}
        <h5> {rating}/5 Stars </h5>
      </div>
    )
  }

  return (
    <div>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        // onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder={reviewTitle}
          value={title}
          className="form-input col-12 col-md-9"
          onChange={handleTitleChange}
        ></textarea>
        <p className={`m-0 ${titleCharacterCount === 30 ? "text-error" : ""}`}>
          Character Count: {titleCharacterCount}/30
        </p>

        <textarea
          placeholder={reviewBody}
          value={editBody}
          className="form-input col-12 col-md-9"
          onChange={handleReviewBodyChange}
        ></textarea>
        <p
          className={`m-0 ${reviewBodyCharacterCount === 1000 ? "text-error" : ""
            }`}
        >
          Character Count: {reviewBodyCharacterCount}/1000
        </p>
        <StarRating />

        {/* {error && <span className="ml-2">Something went wrong...</span>} */}
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Edit;