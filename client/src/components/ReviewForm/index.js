import React, { useState } from "react";

const ReviewForm = () => {
  const [title, setTitle] = useState("");
  const [titleCharacterCount, setTitleCharacterCount] = useState(0);

  const [reviewBody, setReviewBody] = useState("");
  const [reviewBodyCharacterCount, SetReviewBodyCharacterCount] = useState(0);

  const handlereviewBodyChange = (event) => {
    if (event.target.value.length <= 280) {
      setReviewBody(event.target.value);
      SetReviewBodyCharacterCount(event.target.value.length);
    }
  };

  const handleTitleChange = (event) => {
    if (event.target.value.length <= 30) {
      setTitle(event.target.value);
      setTitleCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setTitle("");
    setTitleCharacterCount(0);
    setReviewBody("");
    SetReviewBodyCharacterCount(0);
  };

  return (
    <div>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Whats the title of your review?"
          value={title}
          className="form-input col-12 col-md-9"
          onChange={handleTitleChange}
        ></textarea>
        <p className={`m-0 ${titleCharacterCount === 30 ? "text-error" : ""}`}>
          Character Count: {titleCharacterCount}/30
        </p>
        <textarea
          placeholder="Here's a new review..."
          value={reviewBody}
          className="form-input col-12 col-md-9"
          onChange={handlereviewBodyChange}
        ></textarea>
        <p className={`m-0 ${reviewBodyCharacterCount === 280 ? "text-error" : ""}`}>
          Character Count: {reviewBodyCharacterCount}/280
        </p>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
