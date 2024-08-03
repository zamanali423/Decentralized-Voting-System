const express = require("express");
const router = express.Router();
const User = require("../../database/userData/usersData");
const bcrypt = require("bcryptjs");
const { registerSchema, loginSchema } = require("../../validation/userSchema");
const validate = require("../../middleware/validate");
const authenticate = require("../../middleware/authenticate");
const generateToken = require("../../authentication/generateToken");

//! register user
router.post("/register/newUser", validate(registerSchema), async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  try {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res
        .status(409)
        .json({ msg: "Already have an account on this email" });
    }
    if (password !== confirmPassword) {
      return res.status(401).json({ msg: "Password mismatch" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashPassword,
    });
    await user.save();
    const token = await generateToken(user);
    return res.status(201).json({ msg: "Register successfully", user, token });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! login user
router.post("/Login", validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Email not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Password mismatch" });
    }
    const token = await generateToken(user);
    return res.status(200).json({ msg: "Login successfully", user, token });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! get user
router.get("/getUser", authenticate, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

module.exports = router;
