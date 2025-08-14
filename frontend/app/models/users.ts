import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
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

export default mongoose.models.User || mongoose.model("User", userSchema);
