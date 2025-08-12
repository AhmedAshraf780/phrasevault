const express = require("express");
const cors = require("cors");
const config = require("./config/env.js");
const connectToDB = require("./config/connectToDb.js");
const { userRoutes } = require("./routes/userRoutes.js");

connectToDB(config.MONGO_URI);

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

app.listen(config.PORT, () => {
  console.log(`listenning on port ${config.PORT}`);
});
