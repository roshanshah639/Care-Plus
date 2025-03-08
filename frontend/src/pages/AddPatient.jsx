import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AddPatient = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const initialFormData = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "Male",
    height: "",
    weight: "",
    maritalStatus: "Single",
    contactNumber: "",
    email: "",
    address: "",
    takingMedications: false,
    currentMedications: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    reasonForVisit: "",
    allergies: "",
    anemia: false,
    asthma: false,
    arthritis: false,
    cancer: false,
    diabetes: false,
    Gallstones: false,
    heartDisease: false,
    heartAttack: false,
    highBloodPressure: false,
    digestiveProblems: false,
    hepatitis: false,
    kidneyDisease: false,
    thyroidProblems: false,
    lungDisease: false,
    bleedingDisorder: false,
    OtherIllnesses: "",
    otherComments: "",
    alcoholDaily: false,
    alcoholWeekly: false,
    alcoholMonthly: false,
    alcoholOccasionally: false,
    alcoholNever: false,
    smoke: false,
    cigarettesPerDay: "",
    familyHealthHistory: "",
    exercise: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [patientReportImages, setPatientReportImages] = useState([]); // Array of file objects
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (!token) setError("Please log in to add a patient.");
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Only take the first file (single selection)
    if (!file) return;

    if (patientReportImages.length >= 4) {
      toast.error("You can upload a maximum of 4 images.");
      return;
    }

    // Check if the file is already selected
    if (patientReportImages.some((img) => img.name === file.name)) {
      toast.error("This image is already selected.");
      return;
    }

    setPatientReportImages((prev) => [...prev, file]);
    e.target.value = ""; // Reset input to allow re-selecting the same file
  };

  const handleDeleteImage = (indexToDelete) => {
    setPatientReportImages((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Please log in.");
      toast.error("No authentication token found. Please log in.");
      return;
    }

    // Create FormData object for multipart/form-data submission
    const submissionData = new FormData();
    for (const key in formData) {
      submissionData.append(key, formData[key]);
    }
    patientReportImages.forEach((file) => {
      submissionData.append("patientReport", file); // Match the field name from backend
    });

    try {
      setIsLoading(true);
      console.log("Submitting form data with images...");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/patients/add-patient`,
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from server:", response.data);
      setMessage(response.data.message);
      toast.success(response.data.message);
      setFormData(initialFormData);
      setPatientReportImages([]); // Reset images

      navigate("/patients/view-records");
    } catch (err) {
      console.error("Submission error:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to add patient.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";
  const checkboxClass =
    "h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-700">
            Patient Registration Form
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Please complete the required details to register a new patient.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["firstName", "lastName"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className={labelClass}>
                  {field === "firstName" ? "First Name" : "Last Name"}
                </label>
                <input
                  type="text"
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            ))}
          </div>

          {/* Date of Birth and Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dateOfBirth" className={labelClass}>
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="gender" className={labelClass}>
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
          </div>

          {/* Height and Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["height", "weight"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className={labelClass}>
                  {field === "height" ? "Height (Inches)" : "Weight (Kg)"}
                </label>
                <input
                  type="number"
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  step={field === "height" ? "0.1" : undefined}
                  className={inputClass}
                />
              </div>
            ))}
          </div>

          {/* Marital Status */}
          <div>
            <label htmlFor="maritalStatus" className={labelClass}>
              Marital Status
            </label>
            <select
              name="maritalStatus"
              id="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className={inputClass}
            >
              {["Single", "Married", "Widowed", "Divorced", "Separated"].map(
                (status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Contact Number and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["contactNumber", "email"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className={labelClass}>
                  {field === "contactNumber" ? "Contact Number" : "Email"}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  maxLength={field === "contactNumber" ? "10" : undefined}
                  className={inputClass}
                />
              </div>
            ))}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className={labelClass}>
              Address
            </label>
            <textarea
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              className={inputClass}
            />
          </div>

          {/* Taking Medications */}
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="takingMedications"
                id="takingMedications"
                checked={formData.takingMedications}
                onChange={handleChange}
                className={checkboxClass}
              />
              <label
                htmlFor="takingMedications"
                className="ml-2 text-sm text-gray-900"
              >
                Taking Medications (If any, provide details below)
              </label>
            </div>
            <div className="mt-2">
              <label htmlFor="currentMedications" className={labelClass}>
                Current Medications
              </label>
              <textarea
                name="currentMedications"
                id="currentMedications"
                value={formData.currentMedications}
                onChange={handleChange}
                rows="3"
                className={inputClass}
                placeholder="List current medications (if any)"
              />
            </div>
          </div>

          {/* Emergency Contact Name and Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["emergencyContactName", "emergencyContactNumber"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className={labelClass}>
                  {field === "emergencyContactName"
                    ? "Emergency Contact Name"
                    : "Emergency Contact Number"}
                </label>
                <input
                  type="text"
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  maxLength={
                    field === "emergencyContactNumber" ? "10" : undefined
                  }
                  className={inputClass}
                />
              </div>
            ))}
          </div>

          {/* Reason for Visit */}
          <div>
            <label htmlFor="reasonForVisit" className={labelClass}>
              Reason for Visit
            </label>
            <textarea
              name="reasonForVisit"
              id="reasonForVisit"
              value={formData.reasonForVisit}
              onChange={handleChange}
              required
              rows="3"
              className={inputClass}
              placeholder="Describe the reason for the visit"
            />
          </div>

          {/* Allergies */}
          <div>
            <label htmlFor="allergies" className={labelClass}>
              Allergies (Optional)
            </label>
            <textarea
              name="allergies"
              id="allergies"
              value={formData.allergies}
              onChange={handleChange}
              rows="3"
              className={inputClass}
              placeholder="Milk"
            />
          </div>

          {/* Medical History Checkboxes */}
          <div>
            <h3 className="text-sm text-gray-600 mt-4">
              Have you ever had (Check all that apply):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {[
                "anemia",
                "asthma",
                "arthritis",
                "cancer",
                "diabetes",
                "Gallstones",
                "heartDisease",
                "heartAttack",
                "highBloodPressure",
                "digestiveProblems",
                "hepatitis",
                "kidneyDisease",
                "thyroidProblems",
                "lungDisease",
                "bleedingDisorder",
              ].map((condition) => (
                <div key={condition} className="flex items-center">
                  <input
                    type="checkbox"
                    name={condition}
                    id={condition}
                    checked={formData[condition]}
                    onChange={handleChange}
                    className={checkboxClass}
                  />
                  <label
                    htmlFor={condition}
                    className="ml-2 text-sm text-gray-900"
                  >
                    {condition.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Other Illnesses */}
          <div>
            <label htmlFor="OtherIllnesses" className={labelClass}>
              Other Illnesses (If any)
            </label>
            <textarea
              name="OtherIllnesses"
              id="OtherIllnesses"
              value={formData.OtherIllnesses}
              onChange={handleChange}
              rows="3"
              className={inputClass}
              placeholder="List any other illnesses"
            />
          </div>

          {/* Alcohol Consumption */}
          <div>
            <h3 className="text-md text-gray-500 mb-2">
              How often do you consume alcohol?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {[
                { name: "alcoholDaily", label: "Daily" },
                { name: "alcoholWeekly", label: "Weekly" },
                { name: "alcoholMonthly", label: "Monthly" },
                { name: "alcoholOccasionally", label: "Occasionally" },
                { name: "alcoholNever", label: "Never" },
              ].map((item) => (
                <div key={item.name} className="flex items-center">
                  <input
                    type="checkbox"
                    name={item.name}
                    id={item.name}
                    checked={formData[item.name]}
                    onChange={handleChange}
                    className={checkboxClass}
                  />
                  <label
                    htmlFor={item.name}
                    className="ml-2 text-sm text-gray-900"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Smoking */}
          <div>
            <h3 className="text-md text-gray-500 mb-2">
              Do you smoke? If yes, please mention below (No. of Cigarettes per
              day):
            </h3>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="smoke"
                id="smoke"
                checked={formData.smoke}
                onChange={handleChange}
                className={checkboxClass}
              />
              <label htmlFor="smoke" className="ml-2 text-sm text-gray-900">
                Yes, I smoke
              </label>
            </div>
            {formData.smoke && (
              <div className="mt-2">
                <label htmlFor="cigarettesPerDay" className={labelClass}>
                  Number of Cigarettes per Day
                </label>
                <input
                  type="number"
                  name="cigarettesPerDay"
                  id="cigarettesPerDay"
                  value={formData.cigarettesPerDay}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter number of cigarettes per day"
                />
              </div>
            )}
          </div>

          {/* Exercise */}
          <div>
            <label htmlFor="exercise" className={labelClass}>
              Do you exercise regularly? (If yes, please mention below)
            </label>
            <textarea
              name="exercise"
              id="exercise"
              value={formData.exercise}
              onChange={handleChange}
              rows="3"
              className={inputClass}
              placeholder="Describe your exercise routine (e.g., type, frequency, duration)"
            />
          </div>

          {/* Family Health History */}
          <div>
            <label htmlFor="familyHealthHistory" className={labelClass}>
              Family Health History (If any known health problems)
            </label>
            <textarea
              name="familyHealthHistory"
              id="family penséesHealthHistory"
              value={formData.familyHealthHistory}
              onChange={handleChange}
              rows="3"
              className={inputClass}
              placeholder="Describe any relevant family health conditions (e.g., diabetes, heart disease)"
            />
          </div>

          {/* Prescription or Report Images */}
          <div>
            <label htmlFor="patientReport" className={labelClass}>
              Upload Prescription or Report Images (Optional, max 4)
            </label>
            <input
              type="file"
              name="patientReport"
              id="patientReport"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {patientReportImages.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {patientReportImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${file.name}`}
                      className="w-full h-32 object-cover rounded-md border border-gray-300"
                    />
                    <div className="mt-2 text-sm text-gray-600 truncate">
                      {file.name}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                      title="Delete Image"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Other Comments */}
          <div>
            <label htmlFor="otherComments" className={labelClass}>
              Include other comments regarding your Medical History (Optional)
            </label>
            <textarea
              name="otherComments"
              id="otherComments"
              value={formData.otherComments}
              onChange={handleChange}
              rows="3"
              className={inputClass}
              placeholder="Any additional comments or notes"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={!isAuthenticated || isLoading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isAuthenticated
                  ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                  : "bg-gray-400 cursor-not-allowed"
              } focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="inline-block animate-spin mr-2 h-5 w-5" />
                  Adding Patient...
                </>
              ) : (
                "Add Patient"
              )}
            </button>
          </div>
        </form>

        {/* Success and Error Messages */}
        {message && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPatient;
