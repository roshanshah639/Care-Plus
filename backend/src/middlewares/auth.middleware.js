import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import UserModel from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  // extract access token from cookies or request header
  const token =
    (await req.cookies?.accessToken) ||
    req.header("Authorization")?.replace("Bearer ", "");

  // if token is not found
  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    // decode/verify token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // find user by id
    const user = await UserModel.findById(decodedToken?._id);

    // if user is not found
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    // attach user to request object
    req.user = user;

    // call next middleware
    next();
  } catch (error) {
    throw new ApiError(
      401,
      "Something went wrong while verifying access token"
    );
  }
});

// export const verifyAdmin = asyncHandler(async (req, res, next) => {
//   if (req.user?.role !== "admin") {
//     throw new ApiError(
//       403,
//       "Ops! Sorry, you are not authorized to access this resource"
//     );
//   }

//   next();
// });

// export const verifyDoctor = asyncHandler(async (req, res, next) => {
//   if (req.user?.role !== "doctor") {
//     throw new ApiError(
//       403,
//       "Ops! Sorry, you are not authorized to access this resource"
//     );
//   }

//   next();
// });

export const verifyAdminOrDoctor = asyncHandler(async (req, res, next) => {
  const userRole = req.user.role;
  if (userRole !== "admin" && userRole !== "doctor") {
    throw new ApiError(
      403,
      "Ops! Sorry, you are not authorized to access this resource"
    );
  }

  next();
});
