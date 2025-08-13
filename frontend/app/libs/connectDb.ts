import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

async function dbConnect() {
  mongoose
    .connect(MONGO_URI)
    .then(() => alert("db connected successfully"))
    .catch(() => alert("failed to connect"));
}

export default dbConnect;
