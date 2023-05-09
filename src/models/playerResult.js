const mongoose = require("mongoose");

const playerResultSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
  score: {
    type: Number,
    default: 0,
  },
  answers: [
    {
      questionNumber: { type: Number },
      answered: {
        type: Boolean,
        default: false,
      },
      answers: [ String ],
      time: { type: Number },
      points: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("PlayerResult", playerResultSchema);