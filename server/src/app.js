const express = require("express");
const cors = require("cors");
const router = require("./routes");
const { handleNotFound, handleErrors } = require("./middlewares/handleError");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require("./dbs/mongodb.connect.js");

app.use("/v1/api", router);

app.use(handleNotFound);
app.use(handleErrors);

module.exports = app;
