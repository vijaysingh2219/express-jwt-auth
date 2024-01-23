import { connect } from "mongoose";

const DATABASE_URI: string = process.env.DATABASE_URI ?? "";

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await connect(DATABASE_URI);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
