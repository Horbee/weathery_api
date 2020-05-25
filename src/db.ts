import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`Database connected, Host: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Couldn't connect to Mongo: ${err}`);
    process.exit(1);
  }
};
