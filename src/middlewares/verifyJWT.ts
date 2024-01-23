import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../typings";

/**
 * Middleware to verify the authenticity of a JSON Web Token (JWT) in the Authorization header.
 * If the token is valid, it updates the request object with the decoded username and passes control to the next middleware.
 * If the token is invalid, it returns an appropriate error response.
 *
 * @param {CustomRequest} req - Express Request object extended with custom properties.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express NextFunction to pass control to the next middleware.
 * @returns {Response | void} Response with error if the token is invalid or passes control to the next middleware if the token is valid.
 */
const verifyJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;

    // Check if the Authorization header has the correct format
    if (!authHeader?.startsWith("Bearer ")) {
      return res
        .status(409)
        .json({ error: "Invalid authorization header format" });
    }

    // Extract the token from the Bearer token format
    const token = authHeader.split(" ")[1];

    // Check if the token is provided
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    // Verify the token using the ACCESS_TOKEN_SECRET
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;

    // Update the request object with the decoded username
    req.username = decoded.username;

    // Pass control to the next middleware
    next();
  } catch (err) {
    console.error("Error verifying token:", err);

    // Handle token expiration error
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token has expired" });
    }

    // Handle other token verification errors
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default verifyJWT;
