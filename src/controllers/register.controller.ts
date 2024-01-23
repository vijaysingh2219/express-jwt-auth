import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/user.model";

const SALT_ROUNDS = 10;

/**
 * Handles the registration of a new user.
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns Response with a success message if registration is successful, or an error response.
 */
export const handleNewUser = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username is already taken" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create a new user with the hashed password
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    console.log("User registered successfully: ", newUser);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
