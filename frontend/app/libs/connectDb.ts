import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}
interface MongooseCache {
  conn: typeof import("mongoose") | null;
  promise: Promise<typeof import("mongoose")> | null;
}

let cached: MongooseCache = (global as unknown as { mongoose?: MongooseCache })
  .mongoose || {
  conn: null,
  promise: null,
};

(global as unknown as { mongoose: MongooseCache }).mongoose = cached;

// const cached = (global as any).mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
