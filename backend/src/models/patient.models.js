import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of Birth is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "N/A"],
      trim: true,
      default: "Male",
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    maritalStatus: {
      type: String,
      required: [true, "Marital Status is required"],
      enum: ["Single", "Married", "Widowed", "Divorced", "Separated"],
      trim: true,
      default: "Single",
    },
    contactNumber: {
      type: String,
      required: [true, "Contact Number is required"],
      unique: true,
      trim: true,
      minlength: [10, "Contact Number must be 10 digits"],
      maxlength: [10, "Contact Number must be 10 digits"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    takingMedications: {
      type: Boolean,
      default: false,
    },
    currentMedications: {
      type: String,
      trim: true,
    },
    emergencyContactName: {
      type: String,
      required: [true, "Emergency Contact Name is required"],
      trim: true,
    },
    emergencyContactNumber: {
      type: String,
      required: [true, "Emergency Contact Number is required"],
      unique: true,
      trim: true,
      minlength: [10, "Contact Number must be 10 digits"],
      maxlength: [10, "Contact Number must be 10 digits"],
    },
    reasonForVisit: {
      type: String,
      required: [true, "Reason for visit is required"],
      trim: true,
    },
    allergies: {
      type: String,
      trim: true,
    },
    anemia: {
      type: Boolean,
      default: false,
    },
    asthma: {
      type: Boolean,
      default: false,
    },
    arthritis: {
      type: Boolean,
      default: false,
    },
    cancer: {
      type: Boolean,
      default: false,
    },
    diabetes: {
      type: Boolean,
      default: false,
    },
    Gallstones: {
      type: Boolean,
      default: false,
    },
    heartDisease: {
      type: Boolean,
      default: false,
    },
    heartAttack: {
      type: Boolean,
      default: false,
    },
    highBloodPressure: {
      type: Boolean,
      default: false,
    },
    digestiveProblems: {
      type: Boolean,
      default: false,
    },
    hepatitis: {
      type: Boolean,
      default: false,
    },
    kidneyDisease: {
      type: Boolean,
      default: false,
    },
    thyroidProblems: {
      type: Boolean,
      default: false,
    },
    lungDisease: {
      type: Boolean,
      default: false,
    },
    bleedingDisorder: {
      type: Boolean,
      default: false,
    },
    OtherIllnesses: {
      type: String,
      trim: true,
    },
    alcoholDaily: {
      type: Boolean,
      default: false,
    },
    alcoholWeekly: {
      type: Boolean,
      default: false,
    },
    alcoholMonthly: {
      type: Boolean,
      default: false,
    },
    alcoholOccasionally: {
      type: Boolean,
      default: false,
    },
    alcoholNever: {
      type: Boolean,
      default: false,
    },
    smoke: {
      type: Boolean,
      default: false,
    },
    cigarettesPerDay: {
      type: Number,
    },
    familyHealthHistory: {
      type: String,
      trim: true,
    },
    exercise: {
      type: String,
      trim: true,
    },
    otherComments: {
      type: String,
      trim: true,
    },
    prescriptionOrReportImages: {
      type: [String], // Array of strings to store URLs or file paths
      validate: {
        validator: function (v) {
          return v.length <= 4; // Limits to maximum 4 images
        },
        message: "You can upload a maximum of 4 prescription or report images.",
      },
      default: [], // Default to an empty array
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator of the record is required"],
    },
  },
  { timestamps: true }
);

const PatientModel = mongoose.model("Patient", patientSchema);

export default PatientModel;
