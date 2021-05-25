const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
  {
    name: {
      type: String,
    },
    gameId: {
      type: String,
      unique: true,
    },
    coverUrl: {
      type: String,
    },
    summary: {
      type: String,
    },
  },
);

const Game = model('Game', gameSchema);

module.exports = Game;