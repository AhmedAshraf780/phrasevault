const mongoose = require("mongoose");

function connectToDB(mongodb_uri) {
  mongoose
    .connect(mongodb_uri)
    .then(() => console.log("connect to db successfully.."))
    .catch((err) => console.log("failed to connect to db", err));
}

module.exports = connectToDB;
