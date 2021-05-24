const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    gameId: {
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