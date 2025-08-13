const express = require("express");
const cors = require("cors");
const config = require("./config/env.js");
const connectToDB = require("./config/connectToDb.js");
const { userRoute } = require("./routes/userRoutes.js");
const { phrasesRoute } = require("./routes/phrasesRoutes.js");
const { phrasalsRoute } = require("./routes/phrasalsRoutes.js");
const { idiomsRoute } = require("./routes/idiomsRoutes.js");

connectToDB(config.MONGO_URI);

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", userRoute);
app.use("/phrases", phrasesRoute);
app.use("/phrasals", phrasalsRoute);
app.use("/idioms", idiomsRoute);

app.listen(config.PORT, "0.0.0.0", () => {
  console.log(`listenning on port ${config.PORT}`);
});
