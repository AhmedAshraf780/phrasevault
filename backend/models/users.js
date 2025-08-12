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
  phrases: [
    {
      text: String,
      meaning: String,
    },
  ],
  phrasalVerbs: [
    {
      verb: String,
      meaning: String,
    },
  ],
  idioms: [
    {
      idiom: String,
      meaning: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
