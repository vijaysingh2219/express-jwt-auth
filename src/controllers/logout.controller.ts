import { Request, Response } from "express";
import { User } from "../models/user.model";
import { UserDocument } from "../typings";

/**
 * Handles the logout process.
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns Response with status 204 if logout is successful, or an error response.
 */
export const handleLogout = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;

    // Check if JWT cookie is present
    if (!cookies?.jwt) {
      return res.sendStatus(204); // No content
    }

    const refreshToken = cookies.jwt;

    // Check for refreshToken in the database
    const foundUser: UserDocument = (await User.findOne({
      refreshToken,
    })) as UserDocument;

    // If user not found, clear the JWT cookie and return success
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: false,
        secure: process.env.NODE_ENV === "production",
      });

      return res.sendStatus(204);
    }

    // Delete refreshToken in the database
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log(result);

    // Clear JWT cookie and return success
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: false,
      secure: process.env.NODE_ENV === "production",
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
