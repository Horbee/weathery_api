import mongoose from "mongoose";


import { AppConfig } from "./config/appconfig";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(AppConfig.mongoURI);

    console.log(`Database connected, Host: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Couldn't connect to Mongo: ${err}`);
    process.exit(1);
  }
};
