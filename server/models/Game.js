const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
  {
    gameId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
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