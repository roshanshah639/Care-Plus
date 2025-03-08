import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const AllPatientsRecords = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view patient records.");
      toast.error("Please log in to view patient records.");
      setLoading(false);
      return;
    }

    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/patients/all-patient",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPatients(response.data.data || []);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Failed to fetch patient records.";
        setError(errorMessage);
        toast.error(errorMessage);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleViewPatient = (patientId) => {
    navigate(`/patients/${patientId}`);
  };

  const handleAddPatient = () => {
    navigate("/patients/add-patient");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <p className="text-lg text-gray-700">Loading patient records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="bg-red-100 p-4 rounded-md text-red-700 max-w-md text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            All Patient Records
          </h1>
          <button
            onClick={handleAddPatient}
            className="bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Patient
          </button>
        </div>

        {patients.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No patient records found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-2xl">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-indigo-600 text-white border-b border-gray-300">
                  <th className="py-3 px-4 text-left text-sm font-medium border-r border-gray-300">
                    View
                  </th>
                  {[
                    "First Name",
                    "Last Name",
                    "Date of Birth",
                    "Gender",
                    "Height",
                    "Weight",
                    "Marital Status",
                    "Contact Number",
                    "Email",
                    "Address",
                    "Smoke",
                    "Cigarettes Per Day",
                    "Taking Medications",
                    "Current Medications",
                    "Emergency Contact Name",
                    "Emergency Contact Number",
                    "Reason for Visit",
                    "Allergies",
                    "Anemia",
                    "Asthma",
                    "Arthritis",
                    "Cancer",
                    "Diabetes",
                    "Gallstones",
                    "Heart Disease",
                    "Heart Attack",
                    "High Blood Pressure",
                    "Digestive Problems",
                    "Hepatitis",
                    "Kidney Disease",
                    "Thyroid Problems",
                    "Lung Disease",
                    "Bleeding Disorder",
                    "Other Illnesses",
                    "Alcohol Daily",
                    "Alcohol Weekly",
                    "Alcohol Monthly",
                    "Alcohol Occasionally",
                    "Alcohol Never",
                    "Exercise",
                    "Family Health History",
                    "Other Comments",
                  ].map((header) => (
                    <th
                      key={header}
                      className="py-3 px-4 text-left text-sm font-medium border-r border-gray-300"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr
                    key={patient._id || index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 border-b border-gray-300`}
                  >
                    <td className="py-3 px-4 border-r border-gray-300">
                      <button
                        onClick={() => handleViewPatient(patient._id)}
                        className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
                        title="View Patient"
                      >
                        <FaEye className="w-5 h-5" />
                      </button>
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.firstName}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.lastName}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.gender}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.height || "N/A"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.weight || "N/A"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.maritalStatus}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.contactNumber}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.email}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.address}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.smoke ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.cigarettesPerDay || "0"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.takingMedications ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.currentMedications || "None"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.emergencyContactName}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.emergencyContactNumber}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.reasonForVisit}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.allergies || "None"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.anemia ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.asthma ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.arthritis ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.cancer ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.diabetes ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.Gallstones ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.heartDisease ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.heartAttack ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.highBloodPressure ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.digestiveProblems ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.hepatitis ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.kidneyDisease ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.thyroidProblems ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.lungDisease ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.bleedingDisorder ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.OtherIllnesses || "None"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.alcoholDaily ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.alcoholWeekly ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.alcoholMonthly ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.alcoholOccasionally ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.alcoholNever ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.exercise || "None"}
                    </td>
                    <td className="py-3 px-4 border-r border-gray-300">
                      {patient.familyHealthHistory || "None"}
                    </td>
                    <td className="py-3 px-4">
                      {patient.otherComments || "None"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPatientsRecords;
