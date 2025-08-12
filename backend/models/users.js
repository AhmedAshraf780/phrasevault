const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phrases: {
    type: [
      {
        text: String,
        meaning: String,
      },
    ],
    default: [
      { text: "Break a leg", meaning: "Good luck" },
      { text: "Under the weather", meaning: "Feeling unwell" },
    ],
  },
  phrasalVerbs: {
    type: [
      {
        text: String,
        meaning: String,
      },
    ],
    default: [
      { text: "Look up", meaning: "Search for information" },
      { text: "Run out of", meaning: "Have no more of something" },
    ],
  },
  idioms: {
    type: [
      {
        text: String,
        meaning: String,
      },
    ],
    default: [
      { text: "Hit the sack", meaning: "Go to bed" },
      { text: "Piece of cake", meaning: "Very easy" },
    ],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
