import mongoose from "mongoose";
import { ConnectOptions } from "./types";
import dotenv from "dotenv";

/**
 * Connect to MongoDB using mongoose
 * @param options Connection options (optional, will use MONGODB_URI from .env by default)
 * @returns Mongoose instance
 */
// configure dotenv
dotenv.config();

export const connectMongo = async (
  options?: ConnectOptions
): Promise<typeof mongoose> => {
  try {
    const uri = options?.uri || process.env.MONGODB_URI;

    if (!uri) {
      throw new Error(
        "MongoDB URI not provided. Set MONGODB_URI in .env file or pass as parameter"
      );
    }

    const connection = await mongoose.connect(uri, {
      dbName: options?.dbName,
    });

    console.log("MongoDB connected successfully");
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectMongo;
