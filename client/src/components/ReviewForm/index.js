import React, { useState } from "react";

const ReviewForm = () => {
  const [titleText, setTitleText] = useState("");
  const [titleCharacterCount, setTitleCharacterCount] = useState(0);

  const [bodyText, setBodyText] = useState("");
  const [bodyCharacterCount, setBodyCharacterCount] = useState(0);

  const handleBodyChange = (event) => {
    if (event.target.value.length <= 280) {
      setBodyText(event.target.value);
      setBodyCharacterCount(event.target.value.length);
    }
  };

  const handleTitleChange = (event) => {
    if (event.target.value.length <= 30) {
      setTitleText(event.target.value);
      setTitleCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setTitleText("");
    setTitleCharacterCount(0);
    setBodyText("");
    setBodyCharacterCount(0);
  };

  return (
    <div>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Whats the title of your review?"
          value={titleText}
          className="form-input col-12 col-md-9"
          onChange={handleTitleChange}
        ></textarea>
        <p className={`m-0 ${titleCharacterCount === 30 ? "text-error" : ""}`}>
          Character Count: {titleCharacterCount}/30
        </p>
        <textarea
          placeholder="Here's a new review..."
          value={bodyText}
          className="form-input col-12 col-md-9"
          onChange={handleBodyChange}
        ></textarea>
        <p className={`m-0 ${bodyCharacterCount === 280 ? "text-error" : ""}`}>
          Character Count: {bodyCharacterCount}/280
        </p>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
