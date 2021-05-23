const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: 'You need a title',
      minlength: 1,
      maxlength: 30
    },
    gameTitle: {
      type: String,
      required: 'You need a game title',
      minlength: 1
    },
    gameCoverUrl: {
      type: String,
      required: 'You need a game cover url',
      minlength: 1
    },
    reviewBody: {
      type: String,
      required: 'You need to leave a review!',
      minlength: 1,
      maxlength: 1000
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
  },
);

const Review = model('Review', reviewSchema);

module.exports = Review;