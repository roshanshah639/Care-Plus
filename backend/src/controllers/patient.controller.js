import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import PatientModel from "../models/patient.models.js";
import { uploadOnCLoudinary } from "../utils/cloudinary.js";

const addPatient = asyncHandler(async (req, res) => {
  // Extract details from request body
  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    height,
    weight,
    maritalStatus,
    contactNumber,
    email,
    address,
    takingMedications,
    currentMedications,
    emergencyContactName,
    emergencyContactNumber,
    reasonForVisit,
    allergies,
    anemia,
    asthma,
    arthritis,
    cancer,
    diabetes,
    Gallstones,
    heartDisease,
    heartAttack,
    highBloodPressure,
    digestiveProblems,
    hepatitis,
    kidneyDisease,
    thyroidProblems,
    lungDisease,
    bleedingDisorder,
    OtherIllnesses,
    alcoholDaily,
    alcoholWeekly,
    alcoholMonthly,
    alcoholOccasionally,
    alcoholNever,
    smoke,
    cigarettesPerDay,
    familyHealthHistory,
    exercise,
    otherComments,
  } = req.body;

  // Validations - required fields
  if (
    [
      firstName,
      lastName,
      dateOfBirth,
      gender,
      maritalStatus,
      contactNumber,
      email,
      address,
      emergencyContactName,
      emergencyContactNumber,
      reasonForVisit,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All required fields must be provided");
  }

  // Check for existing patient by email
  const existingPatient = await PatientModel.findOne({ email });
  if (existingPatient) {
    throw new ApiError(400, "Patient already exists with this email");
  }

  // Verify user authentication
  const createdBy = req.user?._id;
  if (!createdBy) {
    throw new ApiError(401, "User is not authenticated");
  }

  // Handle prescriptionOrReportImages upload
  const files = req.files?.patientReport; // Access files from multer's "patientReport" field
  let imageUrls = [];

  if (files && files.length > 0) {
    if (files.length > 4) {
      throw new ApiError(400, "You can upload a maximum of 4 images");
    }

    // Upload each file to Cloudinary
    const uploadPromises = files.map(async (file) => {
      const uploadResult = await uploadOnCLoudinary(file.path);
      if (!uploadResult?.url) {
        throw new ApiError(
          500,
          "Failed to upload one or more images to Cloudinary"
        );
      }
      return uploadResult.url;
    });

    // Wait for all uploads to complete
    imageUrls = await Promise.all(uploadPromises);
  }

  try {
    // Create new patient with image URLs
    const newPatient = await PatientModel.create({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      height,
      weight,
      maritalStatus,
      contactNumber,
      email,
      address,
      takingMedications,
      currentMedications,
      emergencyContactName,
      emergencyContactNumber,
      reasonForVisit,
      allergies,
      anemia,
      asthma,
      arthritis,
      cancer,
      diabetes,
      Gallstones,
      heartDisease,
      heartAttack,
      highBloodPressure,
      digestiveProblems,
      hepatitis,
      kidneyDisease,
      thyroidProblems,
      lungDisease,
      bleedingDisorder,
      OtherIllnesses,
      alcoholDaily,
      alcoholWeekly,
      alcoholMonthly,
      alcoholOccasionally,
      alcoholNever,
      smoke,
      cigarettesPerDay,
      familyHealthHistory,
      exercise,
      otherComments,
      prescriptionOrReportImages: imageUrls, // Add uploaded image URLs
      createdBy,
    });

    // Return success response
    return res
      .status(201)
      .json(new ApiResponse(201, newPatient, "Patient added successfully"));
  } catch (error) {
    console.error("Error creating patient:", error); // Log the error
    throw new ApiError(500, "Failed to add patient due to server error");
  }
});

export default addPatient;

const getAllPatients = asyncHandler(async (req, res) => {
  // find all patients
  const patients = await PatientModel.find({});

  // if patients are not found
  if (!patients) {
    throw new ApiError(404, "No patients found");
  }

  // return the success response
  return res
    .status(200)
    .json(new ApiResponse(200, patients, "Patients fetched successfully"));
});

const getPatientById = async (req, res) => {
  // get patient id from request params
  const { patientId } = req.params;
  try {
    // find patient by id
    const patient = await PatientModel.findById(patientId).select("-__v");

    // if patient is not found
    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }

    // return the success response
    return res
      .status(200)
      .json(new ApiResponse(200, patient, "Patient fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while fetching patient");
  }
};

export { addPatient, getAllPatients, getPatientById };
