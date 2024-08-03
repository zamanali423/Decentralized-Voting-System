const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      option: {
        type: String,
        required: true,
      },
      voteCount: {
        type: Number,
        default: 0,
      },
    },
  ],
  creator: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  votes: [
    {
      userId: {
        type: String,
      },
      optionIndex: {
        type: Number,
      },
      blockchainTransactionId: {
        type: String,
      },
    },
  ],
  blockchainTransactionId: {
    type: String,
    required: true,
  },
  endTime: {
    type: Date,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("polls", pollSchema);
