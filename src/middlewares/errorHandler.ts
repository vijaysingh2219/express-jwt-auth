import { Request, Response, NextFunction } from "express";

/**
 * Error handling middleware for handling internal server errors.
 *
 * @param {Error} err - The error object.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error stack to the console for debugging purposes
  console.error(err.stack);

  // Send a JSON response with a 500 status code and additional error information
  res.status(500).json({
    error: "Internal Server Error",
    name: err.name,
    message: err.message,
  });
};

export default errorHandler;
