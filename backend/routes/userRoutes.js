const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 *  Custom import
 */
const User = require("../models/users");
const config = require("../config/env");

const router = express.Router();

router.get("/", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.decode(token, config.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    return res.status(200).json({
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      success: false,
      message: "Server internal error",
    });
  }
});
// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill out All Fields",
      });
    }

    // 2. Check if username or email exists
    const existed = await User.findOne({ $or: [{ email }, { name }] });
    if (existed) {
      return res.status(409).json({
        success: false,
        message: "This Account already exists",
      });
    }

    // 3. Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Create user in DB
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // 5. Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      config.JWT_SECRET, // keep secret in .env
      { expiresIn: "7d" } // token expires in 7 days
    );

    // 6. Respond
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      userId: user._id,
      userName: user.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Internal Error",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill out all The fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({
        success: false,
        message: "This Account not existed",
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "The password is not correct",
      });
    }
    const token = jwt.sign({ userId: user._id, email }, config.JWT_SECRET, {
      expiresIn: "4d",
    });

    return res.status(200).json({
      success: true,
      message: "User logged Successfully",
      token,
      userId: user._id,
      userName: user.name,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      success: false,
      message: "Server Internal Error",
    });
  }
});

module.exports.userRoute = router;
