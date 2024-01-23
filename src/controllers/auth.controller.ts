import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { UserDocument } from "../typings";

/**
 * Handles user login by validating credentials, creating JWTs, and setting a refresh token cookie.
 *
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @returns {Promise<Response>} Response with access token or error message.
 */
export const handleLogin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract username and password from the request body
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Find the user in the database based on the provided username
    const foundUser: UserDocument | null = await User.findOne({ username });

    // Check if the user exists
    if (!foundUser) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password in the database
    const match = await bcrypt.compare(password, foundUser.password);

    // Check if the passwords match
    if (!match) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Create JWTs (access token and refresh token)
    const accessToken = jwt.sign(
      { username },
      process.env.ACCESS_TOKEN_SECRET ?? "",
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET ?? "",
      { expiresIn: "1d" }
    );

    // Save the refresh token with the current user in the database
    foundUser.refreshToken = refreshToken;
    const result: UserDocument = await foundUser.save();
    console.log(result);

    // Set the refresh token as an HttpOnly cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Respond with the access token
    return res.json({ accessToken });
  } catch (error) {
    console.error("Error login in the user: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
