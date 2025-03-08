import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      // required: [true, "Creator of the record is required"],
    },
    comment: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true,
    },
    testResultImage: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator of the record is required"],
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;
