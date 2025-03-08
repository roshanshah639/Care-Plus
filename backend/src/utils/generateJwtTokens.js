import UserModel from "../models/user.models.js";
import { ApiError } from "./ApiError.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    // find user by id
    const user = await UserModel.findById(userId);

    // if user is not found, throw error
    if (!user) {
      throw new Error("User not found");
    }

    // generare access token
    const accessToken = user.generateAccessToken();

    // generate refresh token
    const refreshToken = user.generateRefreshToken();

    // save refresh token to db
    user.refreshToken = refreshToken;

    // save updated user
    await user.save({ validateBeforeSave: false });

    // return access & refresh token
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access & refresh token"
    );
  }
};

export { generateAccessAndRefreshToken };
