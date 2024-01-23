import express from "express";
import { body } from "express-validator";
const router = express.Router();
import { handleNewUser } from "../controllers/register.controller";

// Password regex pattern
const passwordPattern: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

// Validation middleware for new user registration
const registerValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(passwordPattern)
    .withMessage(
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
];

router.post("/", registerValidation, handleNewUser);

export default router;
