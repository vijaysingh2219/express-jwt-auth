import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
import { UserDocument } from "../typings";

/**
 * Handles the generation of a new access token using a refresh token.
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns Response with a new access token if successful, or an error response.
 */
export const handleRefreshToken = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;

    // Check if JWT cookie is present
    if (!cookies?.jwt) {
      return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt;

    // Check for refreshToken in the database
    const foundUser = (await User.findOne({
      refreshToken,
    })) as UserDocument;

    // If user not found, return Forbidden status
    if (!foundUser) {
      return res.sendStatus(403); // Forbidden
    }

    // Verify the refresh token
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ?? "";
    const decoded = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    ) as JwtPayload;

    // Check if the username in the token matches the user's username
    if (foundUser.username !== decoded.username) {
      return res.sendStatus(403); // Forbidden
    }

    // Generate a new access token
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "";
    const accessToken = jwt.sign(
      { username: decoded.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    // Return the new access token
    res.json({ accessToken });
  } catch (err) {
    console.error("Error verifying or generating token:", err);
    return res.status(403).json({ error: "Invalid token" });
  }
};
