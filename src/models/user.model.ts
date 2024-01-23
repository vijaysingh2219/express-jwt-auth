import { Document, Schema, model } from "mongoose";
import { UserDocument } from "../typings";

// Define the User schema
const userSchema: Schema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: String,
});

// Create the User model
export const User = model<Document>("User", userSchema);
