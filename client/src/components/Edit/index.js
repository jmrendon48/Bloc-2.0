import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { EDIT_REVIEW, DELETE_REVIEW } from "../../utils/mutations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Edit = ({ passedInfo, setShowEditModal }) => {
  const { _id, title, reviewBody } = passedInfo;
  const [ editReview ] = useMutation(EDIT_REVIEW);
  const [ deleteReview ] = useMutation(DELETE_REVIEW);

  const [editTitle, setEditTitle] = useState("");
  const [titleCharacterCount, setTitleCharacterCount] = useState(0);

  const [editBody, setEditBody] = useState("");
  const [editBodyCharacterCount, SetEditBodyCharacterCount] = useState(0);
  console.log(editBody);

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  console.log()

  const handleTitleChange = (event) => {
    if (event.target.value.length <= 30) {
      setEditTitle(event.target.value);
      setTitleCharacterCount(event.target.value.length);
    }
  };

  const handleEditBodyChange = (event) => {
    if (event.target.value.length <= 1000) {
      setEditBody(event.target.value);
      SetEditBodyCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await editReview({
        variables: { _id:_id, title: editTitle, reviewBody:editBody, rating:rating },
      });

      // clear form value
      setEditTitle("");
      setTitleCharacterCount(0);
      setEditBody("");
      SetEditBodyCharacterCount(0);
      setShowEditModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async ( _id ) => {
    console.log(_id)
    try {
      await deleteReview({
        variables: { _id },
      });
      setShowEditModal(false);
    } catch (e) {
      console.error(e);
    }
  }

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
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder={title}
          value={editTitle}
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
          onChange={handleEditBodyChange}
        ></textarea>
        <p
          className={`m-0 ${editBodyCharacterCount === 1000 ? "text-error" : ""
            }`}
        >
          Character Count: {editBodyCharacterCount}/1000
        </p>
        <StarRating />

        {/* {error && <span className="ml-2">Something went wrong...</span>} */}
        <button className="btn btn-success col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
      <button className="btn btn-danger mt-1 col-12 col-md-3" type="button" onClick={() => handleDelete(_id)}>
        Delete Review
      </button>
    </div>
  );
}

export default Edit;