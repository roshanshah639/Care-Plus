import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import UserModel from "../models/user.models.js";
import { generateAccessAndRefreshToken } from "../utils/generateJwtTokens.js";
import { cookieOptions } from "../constants.js";
import { sendVerificationEamil } from "../middlewares/Email.js";

const registerUser = asyncHandler(async (req, res) => {
  // Extract details from request/frontend
  const { name, email, password } = req.body;

  // Validations - all fields are required
  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Find user by email
  const user = await UserModel.findOne({ email });

  // If user is found and already verified, throw error
  if (user && user.isVerified) {
    throw new ApiError(
      400,
      "User already exists with this email and is verified"
    );
  }

  // Generate verification code
  const verificationCode = ((Date.now() % 900000) + 100000)
    .toString()
    .padStart(6, "0");

  // If user exists but is not verified, update the verification code and expiry
  if (user && !user.isVerified) {
    user.verificationCode = verificationCode;
    user.verificationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendVerificationEamil(email, verificationCode);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "User already exists but not verified. New verification code sent."
        )
      );
  }

  // If user is registering for the first time, create new user
  const newUser = new UserModel({
    name,
    email,
    password,
    verificationCode,
    verificationCodeExpiry: new Date(Date.now() + 10 * 60 * 1000),
    isVerified: false, // Default is false, but explicitly setting it for clarity
  });

  // Save new user
  await newUser.save();

  await sendVerificationEamil(email, verificationCode);

  // Find created user & remove password
  const createdUser = await UserModel.findById(newUser._id).select("-password");

  // Return the success response
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdUser,
        "User registered successfully. Please verify your email"
      )
    );
});

const verifyAccount = asyncHandler(async (req, res) => {
  // extract details from request/frontend
  const { verificationCode } = req.body;

  // find user by email
  const user = await UserModel.findOne({ verificationCode });

  // if user is not found, throw error
  if (!user) {
    throw new ApiError(
      400,
      "Verification Code is invalid or expired. Please try again"
    );
  }

  // check if verification code is correct
  if (user.verificationCode !== verificationCode) {
    throw new ApiError(400, "Invalid verification code. Please try again");
  }

  // check if user is already verified
  if (user.isVerified) {
    throw new ApiError(400, "User is already verified");
  }

  // check if verification code is expired
  if (user.verificationCodeExpiry < Date.now()) {
    throw new ApiError(400, "Verification code is expired. Please try again");
  }

  // update user details
  user.isVerified = true;
  user.verificationCode = "";
  user.verificationCodeExpiry = null;

  // save updated user
  await user.save();

  // return the success response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Account Verified successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // extract details from request/frontend
  const { email, password } = req.body;

  // validations - all fields are required
  if ([email, password].some((field) => field?.trim === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // find user by email
  const user = await UserModel.findOne({ email });

  // if user is not found, throw error
  if (!user) {
    throw new ApiError(400, "User not found with this email");
  }

  // check if password is correct
  const isPasswordCorrect = await user.isPasswordCorrect(password);

  // if password is incorrect, throw error
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Email or Password. Please try again");
  }

  // generate access & refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // find logged in user & remove password & refresh token from response
  const loggedinUser = await UserModel.findById(user?._id).select(
    "-password -refreshToken"
  );

  // return the success response
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedinUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // find user by id & clear refresh token
  await UserModel.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  // return the success response
  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser, verifyAccount };
