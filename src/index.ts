import "dotenv/config";
import app from "./app";
import { connection } from "mongoose";
import connectDB from "./config/dbConn";

// Connect to MongoDB
connectDB();

connection.once("open", () => {
  console.log("Connected to MongoDB");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
