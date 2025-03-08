import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCLoudinary } from "../utils/cloudinary.js"; // Fixed typo in import
import CommentModel from "../models/comment.models.js";
import PatientModel from "../models/patient.models.js";

const addComment = asyncHandler(async (req, res) => {
  // Get comment from request body
  const { comment } = req.body;

  // Get patientId from URL parameters
  const { patientId } = req.params;

  // Validation - Check if required fields are present
  if (!patientId) {
    throw new ApiError(400, "Patient ID is required");
  }

  if (!comment || comment.trim() === "") {
    throw new ApiError(400, "Comment is required");
  }

  // Get doctor ID from authenticated user
  const createdBy = req.user?._id;
  if (!createdBy) {
    throw new ApiError(401, "Authentication required");
  }

  // Verify patient exists
  const patient = await PatientModel.findById(patientId);
  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  // Handle test result image upload
  let testResultImageUrl;
  if (req.file?.path) {
    try {
      const uploadResult = await uploadOnCLoudinary(req.file.path);
      if (!uploadResult?.secure_url) {
        throw new ApiError(500, "Failed to upload test result image");
      }
      testResultImageUrl = uploadResult.secure_url;
    } catch (error) {
      throw new ApiError(500, `Image upload failed: ${error.message}`);
    }
  }

  // Create new comment document
  const newComment = await CommentModel.create({
    patientId: patient._id, // Fixed typo from 'patentId' to 'patientId'
    comment: comment.trim(),
    testResultImage: testResultImageUrl,
    createdBy,
  });

  if (!newComment) {
    throw new ApiError(500, "Failed to create comment");
  }

  // Populate referenced fields
  const populatedComment = await newComment.populate([
    { path: "patientId", select: "name" }, // Fixed typo in path
    { path: "createdBy", select: "name" },
  ]);

  // Return success response
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        populatedComment,
        "Comment and test result added successfully"
      )
    );
});

const getCommentsByPatient = asyncHandler(async (req, res) => {
  // Get patientId from URL parameters
  const { patientId } = req.params;

  // find comments
  const comments = await CommentModel.find({ patientId }).populate(
    "createdBy",
    "name"
  );

  // if comments are not found
  if (!comments) {
    throw new ApiError(404, "Comments not found");
  }

  // return the success response
  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // Extract commentId from req.params
  const { commentId } = req.params;

  // Validate commentId
  if (!commentId) {
    throw new ApiError(400, "Comment ID is required");
  }

  // Find the comment by ID
  const comment = await CommentModel.findById(commentId);

  // Check if comment exists
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  // Get the authenticated user's ID (assumed to be set by auth middleware)
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  // Check if the authenticated user is the owner of the comment
  if (comment.createdBy.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this comment");
  }

  // Delete the comment
  const deleteComment = await CommentModel.findByIdAndDelete(commentId);

  // Return success response
  return res
    .status(200)
    .json(new ApiResponse(200, deleteComment, "Comment deleted successfully"));
});

export { addComment, getCommentsByPatient, deleteComment };
