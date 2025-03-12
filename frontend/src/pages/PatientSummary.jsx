// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PatientSummary = () => {
//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPatientSummary = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/patients/patients-summary`,
//           { timeout: 10000 }
//         );
//         setSummary(response?.data?.data);
//         setLoading(false);
//       } catch (err) {
//         setError(
//           err.response?.data?.message || "Failed to fetch patient summary"
//         );
//         setLoading(false);
//       }
//     };

//     fetchPatientSummary();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-[#fbe3f1] text-xl font-semibold animate-pulse">
//           Loading Patient Insights...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-red-600 text-xl font-semibold bg-red-100 px-4 py-2 rounded">
//           {error}
//         </p>
//       </div>
//     );
//   }

//   if (!summary) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-gray-600 text-xl font-medium bg-gray-100 px-4 py-2 rounded">
//           No Patient Data Available
//         </p>
//       </div>
//     );
//   }

//   // Calculate total patients
//   const totalPatients =
//     summary.total.Male + summary.total.Female + summary.total["N/A"];

//   return (
//     <div
//       className="max-w-6xl mx-auto p-4 sm:p-8 bg-gradient-to-br from-[#fbe3f1] via-[#f5d5e8] to-[#f0c8df]
//     rounded-sm shadow-md my-16 xl:my-24"
//     >
//       <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-800 mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
//         Patient Demographics Summary
//       </h2>

//       {/* Total Counts */}
//       <section className="mb-8 p-6 bg-gray-100 rounded-xl shadow-sm border border-indigo-100 hover:shadow-xl transition-shadow duration-300">
//         <h3 className="text-2xl font-semibold text-gray-800 mb-6">
//           Patient Overview
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="text-center p-4 bg-[#fbe3f1] rounded-lg hover:bg-[#f5d5e8] transition-colors duration-200">
//             <p className="text-3xl font-bold text-indigo-600">
//               {totalPatients}
//             </p>
//             <p className="text-slate-700 font-medium">Total Patients</p>
//           </div>
//           <div className="text-center p-4 bg-[#fbe3f1] rounded-lg hover:bg-[#f5d5e8] transition-colors duration-200">
//             <p className="text-3xl font-bold text-blue-600">
//               {summary.total.Male}
//             </p>
//             <p className="text-slate-700 font-medium">Male</p>
//           </div>
//           <div className="text-center p-4 bg-[#fbe3f1] rounded-lg hover:bg-[#f5d5e8] transition-colors duration-200">
//             <p className="text-3xl font-bold text-pink-600">
//               {summary.total.Female}
//             </p>
//             <p className="text-slate-700 font-medium">Female</p>
//           </div>
//           <div className="text-center p-4 bg-[#fbe3f1] rounded-lg hover:bg-[#f5d5e8] transition-colors duration-200">
//             <p className="text-3xl font-bold text-slate-600">
//               {summary.total["N/A"]}
//             </p>
//             <p className="text-slate-700 font-medium">N/A</p>
//           </div>
//         </div>
//       </section>

//       {/* Age Group Breakdown */}
//       <section className="p-6 bg-gray-100 rounded-xl shadow-sm border border-indigo-100 hover:shadow-xl transition-shadow duration-300">
//         <h3 className="text-2xl font-semibold text-slate-800 mb-6">
//           Age Group Insights
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {Object.entries(summary.ageGroups).map(([group, data]) => (
//             <div
//               key={group}
//               className="p-5 bg-gradient-to-br from-[#fbe3f1] to-[#f5d5e8] rounded-lg border border-indigo-200 shadow-sm hover:shadow-md hover:scale-105 transform transition-all duration-300"
//             >
//               <h4 className="text-xl font-semibold text-indigo-700 mb-4">
//                 {group} Years
//               </h4>
//               <div className="space-y-3">
//                 <p className="text-slate-700">
//                   Male:{" "}
//                   <span className="font-bold text-blue-600">{data.Male}</span>
//                 </p>
//                 <p className="text-slate-700">
//                   Female:{" "}
//                   <span className="font-bold text-pink-600">{data.Female}</span>
//                 </p>
//                 <p className="text-slate-700">
//                   N/A:{" "}
//                   <span className="font-bold text-slate-600">
//                     {data["N/A"]}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PatientSummary;

import React, { useState, useEffect } from "react";
import axios from "axios";

const PatientSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientSummary = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/patients/patients-summary`,
          { timeout: 10000 }
        );
        setSummary(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch patient summary"
        );
        setLoading(false);
      }
    };

    fetchPatientSummary();
  }, []);

  // Array of background colors for cards
  const cardColors = [
    "bg-[#fbe3f1]", // Light pink
    "bg-[#f5d5e8]", // Lighter pink
    "bg-[#f0c8df]", // Soft pink
    "bg-[#e8bdd6]", // Muted pink
    "bg-[#e0b2cd]", // Dusty pink
    "bg-[#d8a7c4]", // Pastel pink
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-[#fbe3f1] text-xl font-semibold animate-pulse">
          Loading Patient Insights...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600 text-xl font-semibold bg-red-100 px-4 py-2 rounded">
          {error}
        </p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 text-xl font-medium bg-gray-100 px-4 py-2 rounded">
          No Patient Data Available
        </p>
      </div>
    );
  }

  // Calculate total patients
  const totalPatients =
    summary.total.Male + summary.total.Female + summary.total["N/A"];

  return (
    <div
      className="max-w-6xl mx-auto p-4 sm:p-8 bg-gradient-to-br from-[#fbe3f1] via-[#f5d5e8] to-[#f0c8df] rounded-sm shadow-md 
    mt-16 xl:mt-24 mb-8"
    >
      <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-800 mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
        Patient Demographics Summary
      </h2>

      {/* Total Counts */}
      <section className="mb-8 p-6 bg-gray-100 rounded-xl shadow-sm border border-indigo-100 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Patient Overview
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-[#fbe3f1] rounded-lg hover:bg-[#f5d5e8] transition-colors duration-200">
            <p className="text-3xl font-bold text-indigo-600">
              {totalPatients}
            </p>
            <p className="text-slate-700 font-medium">Total Patients</p>
          </div>
          <div className="text-center p-4 bg-[#fbe3f1] rounded-lg hover:bg-[#f5d5e8] transition-colors duration-200">
            <p className="text-3xl font-bold text-blue-600">
              {summary.total.Male}
            </p>
            <p className="text-slate-700 font-medium">Male</p>
          </div>
          <div className="text-center p-4 bg-[#fbe3f1] rounded-lg hover:bg-[#f5d5e8] transition-colors duration-200">
            <p className="text-3xl font-bold text-pink-600">
              {summary.total.Female}
            </p>
            <p className="text-slate-700 font-medium">Female</p>
          </div>
          <div className="text-center p-4 bg-[#fbe3f1] rounded-lg hover:bg-[#f5d5e8] transition-colors duration-200">
            <p className="text-3xl font-bold text-slate-600">
              {summary.total["N/A"]}
            </p>
            <p className="text-slate-700 font-medium">N/A</p>
          </div>
        </div>
      </section>

      {/* Age Group Breakdown */}
      <section className="p-6 bg-gray-100 rounded-xl shadow-sm border border-indigo-100 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold text-slate-800 mb-6">
          Age Group Insights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(summary.ageGroups).map(([group, data], index) => (
            <div
              key={group}
              className={`p-5 ${
                cardColors[index % cardColors.length]
              } rounded-lg border border-indigo-200 shadow-sm hover:shadow-md hover:scale-105 transform transition-all duration-300`}
            >
              <h4 className="text-xl font-semibold text-indigo-700 mb-4">
                {group} Years
              </h4>
              <div className="space-y-3">
                <p className="text-slate-700">
                  Male:{" "}
                  <span className="font-bold text-blue-600">{data.Male}</span>
                </p>
                <p className="text-slate-700">
                  Female:{" "}
                  <span className="font-bold text-pink-600">{data.Female}</span>
                </p>
                <p className="text-slate-700">
                  N/A:{" "}
                  <span className="font-bold text-slate-600">
                    {data["N/A"]}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PatientSummary;
