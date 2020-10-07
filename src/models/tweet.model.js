const { Schema, model } = require("mongoose");

const tweetSchema = new Schema(
  {
    text: {
      type: Schema.Types.String,
      required: [true, "El mensaje es requerido"],
      maxlength: [280, "El máximo de caracteres permitidos es de 280"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Tweet", tweetSchema);
