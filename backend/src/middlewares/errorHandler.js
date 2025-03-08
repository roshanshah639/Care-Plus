import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "something went wrong";

  if (err.name === "castError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ApiError(400, message);
  }

  if (err.name === "jsonwebTokenError") {
    const message = `Invalid Json Web Token. Please try again.`;
    err = new ApiError(400, message);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired.`;
    err = new ApiError(400, message);
  }

  // if (err.code === 11000) {
  //   const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
  //   err = new ApiError(400, message);
  // }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
