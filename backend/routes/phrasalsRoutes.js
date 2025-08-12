const express = require("express");
const jwt = require("jsonwebtoken");

/**
 *  Custom import
 */
const User = require("../models/users");
const config = require("../config/env");

const router = express.Router();

router.get("/", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const token = authHeader.slice(7);
  try {
    // TODO: validate the token

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not existed",
      });
    }
    return res.status(200).json({
      phrasals: user?.phrasalVerbs,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: true,
      message: "Server Internal Error",
    });
  }
});

router.post("/", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const token = authHeader.slice(7);

  const { text, meaning } = req.body;

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.phrasalVerbs.push({ text, meaning });
    await user.save();

    return res.status(200).json({
      success: true,
      message: `phrasal verb added ${text}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Internal Error",
    });
  }
});

router.put("/", async (req, res) => {
  const { phrasals } = req.body;
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "UnAuthorized Request",
    });
  }

  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    await User.findByIdAndUpdate(
      decoded.userId,
      { phrasalVerbs: phrasals },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "phrasal updated successfully..",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Internal Error",
    });
  }
});

module.exports.phrasalsRoute = router;
