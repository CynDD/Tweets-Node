const Tweet = require("../models/tweet.model");
const express = require("express");
const checkJwt = require("express-jwt");
const router = express.Router();
const { SECRET_KEY } = require("../config");
const { ErrorHandler } = require("../errors");

router.post(
  "/",
  checkJwt({ secret: SECRET_KEY, algorithms: ["HS256"] }),
  async (req, res, next) => {
    try {
      const newTweet = new Tweet({
        text: req.body.text,
        author: req.user.id,
      });

      const error = newTweet.validateSync();
      if (error) {
        throw new ErrorHandler(400, error.message);
      }

      await newTweet.save();

      const populatedTweet = await newTweet.execPopulate("author", "-hash");
      res.status(200).json(populatedTweet);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const tweets = await Tweet.find().populate("author", "-hash").lean();

    res.json(tweets);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
