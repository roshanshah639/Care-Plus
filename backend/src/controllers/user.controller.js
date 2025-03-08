import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import UserModel from "../models/user.models.js";
import {
  deleteFromCloudinary,
  uploadOnCLoudinary,
} from "../utils/cloudinary.js";

const getUser = asyncHandler(async (req, res) => {
  // get user from request
  const user = await UserModel.findById(req.user?._id).select("-password");

  // if user is not found
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  // return the success response
  return res
    .status(201)
    .json(new ApiResponse(201, user, "User details fetched successfully"));
});

const updateUserAccountDetails = asyncHandler(async (req, res) => {
  // extract details from request/frontend
  const { name, email, bio } = req.body;

  // validations - all fields are required
  if ([name, email, bio].some((field) => field?.trim === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // find user by id
  const user = await UserModel.findById(req.user?._id);

  // if user is not found
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // delete old avatar from cloudinary
  if (user.avatar) {
    await deleteFromCloudinary(user.avatar?.public_id);
  }

  // update user details
  if (name) {
    user.name = name;
  }

  if (email) {
    user.email = email;
  }

  if (bio) {
    user.bio = bio;
  }

  let avatarLocalPath;
  if (req.file) {
    avatarLocalPath = req.file.path;
  }

  // upload avatar to cloudinary
  if (avatarLocalPath) {
    const uploadResult = await uploadOnCLoudinary(avatarLocalPath);
    if (!uploadResult?.url) {
      throw new ApiError(500, "Failed to upload avatar to Cloudinary");
    }
    user.avatar = uploadResult.secure_url;
  }

  // save updated user
  const updatedUser = await user.save({ validateBeforeSave: false });

  // return the success response
  return res
    .status(201)
    .json(
      new ApiResponse(201, updatedUser, "User details updated successfully")
    );
});

export { getUser, updateUserAccountDetails };
