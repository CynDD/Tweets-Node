const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/user.route");
const sessionRoute = require("./routes/sessions.route");
const tweetRoute = require("./routes/tweet.route");
const cors = require("cors");
const { PORT, MONGODB_CONNECTION } = require("./config");
const { handleError } = require("./errors");

mongoose
  .connect(MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("La BD se inicializó correctamente.");

    app.use(cors());
    // middleware para colocar en req.body el json que viene en el body del request
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use("/users", userRoute);
    app.use("/sessions", sessionRoute);
    app.use("/tweets", tweetRoute);
    app.use((error, req, res, next) => {
      handleError(error, res);
    });
    console.log(PORT);
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => console.error(err.message));
