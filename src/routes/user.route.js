const { Router } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { hash } = require("bcrypt");
const router = Router();
const { SECRET_KEY } = require("../config");

router.post("/", async (req, res) => {
  try {
    const passHash = await hash(req.body.password, 10);
    const newUser = await User.create({
      email: req.body.email,
      username: req.body.username,
      hash: passHash,
    });
    const userData = {
      email: newUser.email,
      username: newUser.username,
      id: newUser._id,
    };
    const token = jwt.sign(userData, SECRET_KEY);
    res.json({ token: token, user: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
