import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

async function dbConnect() {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("db connected successfully"))
    .catch(() => console.log("failed to connect"));
}

export default dbConnect;
