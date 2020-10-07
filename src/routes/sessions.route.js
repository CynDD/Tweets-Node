const { Router } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { compare } = require("bcrypt");
const router = Router();
const { SECRET_KEY } = require("../config");
const { ErrorHandler } = require("../errors");

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    }).lean();

    if (!user) {
      throw new ErrorHandler(
        401,
        "No se encuentra ningún usuario con ese email"
      );
    }

    const match = await compare(req.body.password, user.hash);
    if (!match) {
      throw new ErrorHandler(401, "Contraseña incorrecta");
    }

    const userPayload = {
      email: user.email,
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userPayload, SECRET_KEY);

    res.json({
      user: userPayload,
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
