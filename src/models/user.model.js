const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: [(email) => isEmail(email), "correo inválido"],
  },
  username: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
});

module.exports = model("User", userSchema);
