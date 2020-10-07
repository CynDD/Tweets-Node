require("dotenv").config();

exports.SECRET_KEY = process.env.SECRET_KEY || "CLAVE_SECRETA";
exports.PORT = process.env.PORT || 4000;
exports.MONGODB_CONNECTION =
  process.env.MONGODB_CONNECTION || "mongodb://localhost/twitter";
