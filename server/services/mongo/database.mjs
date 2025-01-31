import "dotenv/config";
import mongoose from "mongoose";

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

const db = async () => {
  try {
    const conn = await mongoose.connect(MONGO_CONNECTION_STRING, {});
    console.log(`mongodb connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`error connecting to mongodb: ${error.message}`);
    process.exit(1);
  }
};

export default connectToDb;
