import { Request } from "express";

// Interface for the User document
export interface UserDocument extends Document {
  username: string;
  password: string;
  refreshToken?: String;
  save(): Promise;
}

export interface CustomRequest extends Request {
  username?: string;
}
