// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";
// import { jsPDF } from "jspdf";

// const PatientReport = () => {
//   const { patientId } = useParams();
//   const [patient, setPatient] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [newComment, setNewComment] = useState("");
//   const [testResultImage, setTestResultImage] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [commentLoading, setCommentLoading] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("Please log in to view this report.");
//       toast.error("Please log in to view this report.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const tokenParts = token.split(".");
//       if (tokenParts.length !== 3) {
//         throw new Error("Invalid JWT format");
//       }
//       const decodedPayload = JSON.parse(atob(tokenParts[1]));
//       const role = decodedPayload.role || "unknown";
//       const id =
//         decodedPayload.id ||
//         decodedPayload.sub ||
//         decodedPayload._id ||
//         decodedPayload.userId ||
//         null;
//       setUserRole(role);
//       setUserId(id);
//     } catch (err) {
//       setError("Invalid token format. Please log in again.");
//       toast.error("Invalid token format. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     const fetchPatientAndComments = async () => {
//       try {
//         const patientResponse = await axios.get(
//           `http://localhost:8080/api/v1/patients/patient/${patientId}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setPatient(patientResponse.data.data || null);

//         const commentsResponse = await axios.get(
//           `http://localhost:8080/api/v1/comments/patient/${patientId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setComments(commentsResponse.data.data || []);
//       } catch (err) {
//         const errorMessage =
//           err.response?.data?.message ||
//           "Failed to fetch patient details or comments.";
//         setError(errorMessage);
//         toast.error(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatientAndComments();
//   }, [patientId]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     if (!token || !newComment.trim()) {
//       toast.error(
//         !token ? "Please log in to add a comment." : "Comment is required."
//       );
//       return;
//     }

//     setCommentLoading(true);
//     const formData = new FormData();
//     formData.append("comment", newComment.trim());
//     if (testResultImage) formData.append("testResultImage", testResultImage);

//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/v1/comments/add-comment/${patientId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setComments([...comments, response.data.data]);
//       setNewComment("");
//       setTestResultImage(null);
//       toast.success("Comment added successfully!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to add comment.");
//     } finally {
//       setCommentLoading(false);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please log in to delete a comment.");
//       return;
//     }

//     if (window.confirm("Are you sure you want to delete this comment?")) {
//       try {
//         await axios.delete(
//           `http://localhost:8080/api/v1/comments/delete-comment/${commentId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setComments(comments.filter((comment) => comment._id !== commentId));
//         toast.success("Comment deleted successfully!");
//       } catch (err) {
//         toast.error(err.response?.data?.message || "Failed to delete comment.");
//       }
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && !file.type.startsWith("image/")) {
//       toast.error("Please upload an image file.");
//       setTestResultImage(null);
//     } else {
//       setTestResultImage(file);
//     }
//   };

//   const downloadPDF = () => {
//     const doc = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();
//     const margin = 15;
//     const usableWidth = pageWidth - 2 * margin;
//     const primaryColor = [0, 102, 204];
//     const textColor = [40, 40, 40];
//     const accentColor = [200, 200, 200];
//     let y = margin;

//     const addHeader = () => {
//       doc.setFillColor(230, 240, 255);
//       doc.rect(0, 0, pageWidth, 25, "F");
//       doc.setFontSize(16);
//       doc.setTextColor(...primaryColor);
//       doc.setFont("helvetica", "bold");
//       doc.text("Patient Report", pageWidth / 2, 10, { align: "center" });
//       doc.setFontSize(12);
//       doc.text(`${patient.firstName} ${patient.lastName}`, pageWidth / 2, 20, {
//         align: "center",
//       });
//       doc.setDrawColor(...primaryColor);
//       doc.setLineWidth(0.4);
//       doc.line(margin, 25, pageWidth - margin, 25);
//       y = 30;
//     };

//     const addFooter = () => {
//       doc.setFontSize(8);
//       doc.setTextColor(100, 100, 100);
//       doc.text(
//         `Generated By:Care Plus | Date: ${new Date().toLocaleDateString()} | Page ${
//           doc.internal.getCurrentPageInfo().pageNumber
//         }`,
//         pageWidth / 2,
//         pageHeight - 5,
//         { align: "center" }
//       );
//       doc.setDrawColor(...accentColor);
//       doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);
//     };

//     const checkPageBreak = (requiredHeight) => {
//       if (pageHeight - y - 15 < requiredHeight) {
//         addFooter();
//         doc.addPage();
//         addHeader();
//       }
//     };

//     const addSection = (title, fields, includeImages = false, images = []) => {
//       const lineHeight = 6;
//       const sectionHeaderHeight = 12;
//       let sectionHeight =
//         sectionHeaderHeight + fields.length * (lineHeight + 2);
//       if (includeImages) sectionHeight += images.length * 45;

//       checkPageBreak(sectionHeight);

//       doc.setFontSize(12);
//       doc.setTextColor(...primaryColor);
//       doc.setFont("helvetica", "bold");
//       doc.text(title, margin, y);
//       doc.setDrawColor(...primaryColor);
//       doc.line(margin, y + 1, margin + usableWidth, y + 1);
//       y += sectionHeaderHeight;

//       doc.setFontSize(9);
//       doc.setTextColor(...textColor);
//       doc.setFont("helvetica", "light");
//       fields.forEach(({ label, value }) => {
//         const wrappedLabel = doc.splitTextToSize(`${label}`, usableWidth / 2);
//         const wrappedValue = doc.splitTextToSize(
//           `${value || ""}`,
//           usableWidth / 2
//         );
//         const fieldHeight =
//           Math.max(wrappedLabel.length, wrappedValue.length) * lineHeight;
//         checkPageBreak(fieldHeight + 5);

//         doc.text(wrappedLabel, margin, y);
//         doc.text(wrappedValue, margin + usableWidth / 2, y);
//         y += fieldHeight + 2;
//       });

//       if (includeImages && images.length > 0) {
//         y += 5;
//         images.forEach((imageUrl, index) => {
//           checkPageBreak(45);
//           try {
//             doc.addImage(
//               imageUrl,
//               "JPEG",
//               margin,
//               y,
//               60,
//               35,
//               undefined,
//               "FAST"
//             );
//             doc.setDrawColor(...accentColor);
//             doc.rect(margin, y, 60, 35);
//             doc.setFontSize(8);
//             doc.text(`Image ${index + 1}`, margin, y + 40);
//             y += 45;
//           } catch (err) {
//             doc.text(`[Image ${index + 1} unavailable]`, margin, y);
//             y += 10;
//           }
//         });
//       }
//       y += 10;
//     };

//     addHeader();

//     addSection("Personal Information", [
//       { label: "First Name:", value: patient.firstName },
//       { label: "Last Name:", value: patient.lastName },
//       {
//         label: "Date of Birth:",
//         value: new Date(patient.dateOfBirth).toLocaleDateString(),
//       },
//       { label: "Gender:", value: patient.gender },
//       { label: "Height:", value: patient.height || "N/A" },
//       { label: "Weight:", value: patient.weight || "N/A" },
//       { label: "Marital Status:", value: patient.maritalStatus },
//     ]);

//     addSection("Contact Information", [
//       { label: "Contact Number:", value: patient.contactNumber },
//       { label: "Email:", value: patient.email },
//       { label: "Address:", value: patient.address },
//     ]);

//     addSection("Emergency Contact", [
//       { label: "Name:", value: patient.emergencyContactName },
//       { label: "Number:", value: patient.emergencyContactNumber },
//     ]);

//     addSection("Medical Information", [
//       {
//         label: "Taking Medications:",
//         value: patient.takingMedications ? "Yes" : "No",
//       },
//       {
//         label: "Current Medications:",
//         value: patient.currentMedications || "None",
//       },
//       { label: "Reason for Visit:", value: patient.reasonForVisit },
//       { label: "Allergies:", value: patient.allergies || "None" },
//     ]);

//     addSection("Lifestyle Factors", [
//       { label: "Smoke:", value: patient.smoke ? "Yes" : "No" },
//       { label: "Cigarettes Per Day:", value: patient.cigarettesPerDay || "0" },
//       { label: "Alcohol Daily:", value: patient.alcoholDaily ? "Yes" : "No" },
//       { label: "Alcohol Weekly:", value: patient.alcoholWeekly ? "Yes" : "No" },
//       {
//         label: "Alcohol Monthly:",
//         value: patient.alcoholMonthly ? "Yes" : "No",
//       },
//       {
//         label: "Alcohol Occasionally:",
//         value: patient.alcoholOccasionally ? "Yes" : "No",
//       },
//       { label: "Alcohol Never:", value: patient.alcoholNever ? "Yes" : "No" },
//       { label: "Exercise:", value: patient.exercise || "None" },
//     ]);

//     addSection("Medical History", [
//       { label: "Anemia:", value: patient.anemia ? "Yes" : "No" },
//       { label: "Asthma:", value: patient.asthma ? "Yes" : "No" },
//       { label: "Arthritis:", value: patient.arthritis ? "Yes" : "No" },
//       { label: "Cancer:", value: patient.cancer ? "Yes" : "No" },
//       { label: "Diabetes:", value: patient.diabetes ? "Yes" : "No" },
//       { label: "Gallstones:", value: patient.Gallstones ? "Yes" : "No" },
//       { label: "Heart Disease:", value: patient.heartDisease ? "Yes" : "No" },
//       { label: "Heart Attack:", value: patient.heartAttack ? "Yes" : "No" },
//       {
//         label: "High Blood Pressure:",
//         value: patient.highBloodPressure ? "Yes" : "No",
//       },
//       {
//         label: "Digestive Problems:",
//         value: patient.digestiveProblems ? "Yes" : "No",
//       },
//       { label: "Hepatitis:", value: patient.hepatitis ? "Yes" : "No" },
//       { label: "Kidney Disease:", value: patient.kidneyDisease ? "Yes" : "No" },
//       {
//         label: "Thyroid Problems:",
//         value: patient.thyroidProblems ? "Yes" : "No",
//       },
//       { label: "Lung Disease:", value: patient.lungDisease ? "Yes" : "No" },
//       {
//         label: "Bleeding Disorder:",
//         value: patient.bleedingDisorder ? "Yes" : "No",
//       },
//       { label: "Other Illnesses:", value: patient.OtherIllnesses || "None" },
//       {
//         label: "Family Health History:",
//         value: patient.familyHealthHistory || "None",
//       },
//       { label: "Other Comments:", value: patient.otherComments || "None" },
//     ]);

//     // Add Prescription/Report Images to PDF
//     if (patient.prescriptionOrReportImages?.length > 0) {
//       addSection(
//         "Patient Prescription/Report Images",
//         [],
//         true,
//         patient.prescriptionOrReportImages.slice(0, 4)
//       );
//     }

//     if (comments.length > 0) {
//       const commentFields = comments.map((comment, index) => ({
//         label: `Comment ${index + 1} by ${
//           comment.createdBy?.name || "Doctor"
//         } (${new Date(comment.createdAt).toLocaleDateString()}):`,
//         value: comment.comment,
//       }));
//       const commentImages = comments
//         .filter((c) => c.testResultImage)
//         .map((c) => c.testResultImage);
//       addSection(
//         "Doctor's Comments/Treatment Advice",
//         commentFields,
//         true,
//         commentImages
//       );
//     }

//     addFooter();
//     doc.save(`${patient.firstName}_${patient.lastName}_Report.pdf`);
//   };

//   const printReport = () => window.print();

//   const openImageModal = (imageUrl) => setSelectedImage(imageUrl);
//   const closeImageModal = () => setSelectedImage(null);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
//         <p className="text-lg text-gray-700 animate-pulse">
//           Loading patient report...
//         </p>
//       </div>
//     );
//   }

//   if (error || !patient) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
//         <div className="bg-red-200 p-6 rounded-lg text-red-800 max-w-md text-center shadow-lg">
//           {error || "Patient data not found."}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 py-6 px-4 sm:px-6 lg:px-8 mt-16">
//       <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border-4 border-indigo-400">
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
//           <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
//             Patient Report: {patient.firstName} {patient.lastName}
//           </h1>
//           <div className="mt-4 sm:mt-0 flex space-x-4 print:hidden">
//             <button
//               onClick={printReport}
//               className="bg-green-500 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition duration-300"
//             >
//               Print Report
//             </button>
//             <button
//               onClick={downloadPDF}
//               className="bg-indigo-600 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition duration-300"
//             >
//               Download Report
//             </button>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <Section
//             title="Personal Information"
//             bgColor="bg-blue-100"
//             borderColor="border-blue-300"
//           >
//             <Field label="First Name" value={patient.firstName} />
//             <Field label="Last Name" value={patient.lastName} />
//             <Field
//               label="Date of Birth"
//               value={new Date(patient.dateOfBirth).toLocaleDateString()}
//             />
//             <Field label="Gender" value={patient.gender} />
//             <Field label="Height" value={patient.height || "N/A"} />
//             <Field label="Weight" value={patient.weight || "N/A"} />
//             <Field label="Marital Status" value={patient.maritalStatus} />
//           </Section>

//           <Section
//             title="Contact Information"
//             bgColor="bg-green-100"
//             borderColor="border-green-300"
//           >
//             <Field label="Contact Number" value={patient.contactNumber} />
//             <Field label="Email" value={patient.email} />
//             <Field label="Address" value={patient.address} />
//           </Section>

//           <Section
//             title="Emergency Contact"
//             bgColor="bg-yellow-100"
//             borderColor="border-yellow-300"
//           >
//             <Field label="Name" value={patient.emergencyContactName} />
//             <Field label="Number" value={patient.emergencyContactNumber} />
//           </Section>

//           <Section
//             title="Medical Information"
//             bgColor="bg-pink-100"
//             borderColor="border-pink-300"
//           >
//             <Field
//               label="Taking Medications"
//               value={patient.takingMedications ? "Yes" : "No"}
//             />
//             <Field
//               label="Current Medications"
//               value={patient.currentMedications || "None"}
//             />
//             <Field label="Reason for Visit" value={patient.reasonForVisit} />
//             <Field label="Allergies" value={patient.allergies || "None"} />
//           </Section>

//           <Section
//             title="Lifestyle Factors"
//             bgColor="bg-yellow-50"
//             borderColor="border-yellow-200"
//           >
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <Field
//                 label="Smoke"
//                 value={patient.smoke ? "Yes" : "No"}
//                 highlight={patient.smoke}
//               />
//               <Field
//                 label="Cigarettes Per Day"
//                 value={patient.cigarettesPerDay || "0"}
//               />
//               <Field
//                 label="Alcohol Daily"
//                 value={patient.alcoholDaily ? "Yes" : "No"}
//                 highlight={patient.alcoholDaily}
//               />
//               <Field
//                 label="Alcohol Weekly"
//                 value={patient.alcoholWeekly ? "Yes" : "No"}
//                 highlight={patient.alcoholWeekly}
//               />
//               <Field
//                 label="Alcohol Monthly"
//                 value={patient.alcoholMonthly ? "Yes" : "No"}
//                 highlight={patient.alcoholMonthly}
//               />
//               <Field
//                 label="Alcohol Occasionally"
//                 value={patient.alcoholOccasionally ? "Yes" : "No"}
//                 highlight={patient.alcoholOccasionally}
//               />
//               <Field
//                 label="Alcohol Never"
//                 value={patient.alcoholNever ? "Yes" : "No"}
//                 highlight={patient.alcoholNever}
//               />
//               <Field label="Exercise" value={patient.exercise || "None"} />
//             </div>
//           </Section>

//           <Section
//             title="Medical History"
//             bgColor="bg-purple-100"
//             borderColor="border-purple-300"
//           >
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <Field
//                 label="Anemia"
//                 value={patient.anemia ? "Yes" : "No"}
//                 highlight={patient.anemia}
//               />
//               <Field
//                 label="Asthma"
//                 value={patient.asthma ? "Yes" : "No"}
//                 highlight={patient.asthma}
//               />
//               <Field
//                 label="Arthritis"
//                 value={patient.arthritis ? "Yes" : "No"}
//                 highlight={patient.arthritis}
//               />
//               <Field
//                 label="Cancer"
//                 value={patient.cancer ? "Yes" : "No"}
//                 highlight={patient.cancer}
//               />
//               <Field
//                 label="Diabetes"
//                 value={patient.diabetes ? "Yes" : "No"}
//                 highlight={patient.diabetes}
//               />
//               <Field
//                 label="Gallstones"
//                 value={patient.Gallstones ? "Yes" : "No"}
//                 highlight={patient.Gallstones}
//               />
//               <Field
//                 label="Heart Disease"
//                 value={patient.heartDisease ? "Yes" : "No"}
//                 highlight={patient.heartDisease}
//               />
//               <Field
//                 label="Heart Attack"
//                 value={patient.heartAttack ? "Yes" : "No"}
//                 highlight={patient.heartAttack}
//               />
//               <Field
//                 label="High Blood Pressure"
//                 value={patient.highBloodPressure ? "Yes" : "No"}
//                 highlight={patient.highBloodPressure}
//               />
//               <Field
//                 label="Digestive Problems"
//                 value={patient.digestiveProblems ? "Yes" : "No"}
//                 highlight={patient.digestiveProblems}
//               />
//               <Field
//                 label="Hepatitis"
//                 value={patient.hepatitis ? "Yes" : "No"}
//                 highlight={patient.hepatitis}
//               />
//               <Field
//                 label="Kidney Disease"
//                 value={patient.kidneyDisease ? "Yes" : "No"}
//                 highlight={patient.kidneyDisease}
//               />
//               <Field
//                 label="Thyroid Problems"
//                 value={patient.thyroidProblems ? "Yes" : "No"}
//                 highlight={patient.thyroidProblems}
//               />
//               <Field
//                 label="Lung Disease"
//                 value={patient.lungDisease ? "Yes" : "No"}
//                 highlight={patient.lungDisease}
//               />
//               <Field
//                 label="Bleeding Disorder"
//                 value={patient.bleedingDisorder ? "Yes" : "No"}
//                 highlight={patient.bleedingDisorder}
//               />
//             </div>
//             <Field
//               label="Other Illnesses"
//               value={patient.OtherIllnesses || "None"}
//             />
//             <Field
//               label="Family Health History"
//               value={patient.familyHealthHistory || "None"}
//             />
//             <Field
//               label="Other Comments"
//               value={patient.otherComments || "None"}
//             />
//           </Section>

//           <Section
//             title="Patient Prescription/Report Images"
//             bgColor="bg-orange-100"
//             borderColor="border-orange-300"
//           >
//             {patient.prescriptionOrReportImages?.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//                 {patient.prescriptionOrReportImages
//                   .slice(0, 4)
//                   .map((image, index) => (
//                     <div key={index} className="flex flex-col items-center">
//                       <img
//                         src={image}
//                         alt={`Prescription/Report ${index + 1}`}
//                         className="w-32 h-32 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
//                         onClick={() => openImageModal(image)}
//                       />
//                       <p className="text-sm text-gray-600 mt-1">
//                         Image {index + 1}
//                       </p>
//                     </div>
//                   ))}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-600">
//                 No prescription or report images available.
//               </p>
//             )}
//           </Section>

//           <Section
//             title="Doctor's Comments/Treatment Advice"
//             bgColor="bg-teal-100"
//             borderColor="border-teal-300"
//           >
//             {comments.length > 0 ? (
//               <div className="space-y-4">
//                 {comments.map((comment, index) => {
//                   const createdById =
//                     comment.createdBy?._id ||
//                     comment.createdBy?.id ||
//                     comment.createdBy?.userId;
//                   const canDelete =
//                     userRole === "doctor" && userId && userId === createdById;
//                   return (
//                     <div key={index} className="border-b border-teal-200 pb-2">
//                       <p className="text-sm font-semibold text-gray-700">
//                         {comment.createdBy?.name || "Doctor"} (
//                         {new Date(comment.createdAt).toLocaleDateString()})
//                       </p>
//                       <p className="text-sm text-gray-900 mt-1">
//                         {comment.comment}
//                       </p>
//                       {comment.testResultImage && (
//                         <img
//                           src={comment.testResultImage}
//                           alt={`Test Result ${index + 1}`}
//                           className="w-24 h-24 object-cover rounded-md mt-2 cursor-pointer hover:opacity-80 transition-opacity"
//                           onClick={() =>
//                             openImageModal(comment.testResultImage)
//                           }
//                         />
//                       )}
//                       {canDelete && (
//                         <button
//                           onClick={() => handleDeleteComment(comment._id)}
//                           className="mt-4 mb-4 py-1 px-4 text-sm font-semibold text-[crimson] hover:text-red-700 focus:outline-none"
//                         >
//                           Delete
//                         </button>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-600">No comments yet.</p>
//             )}

//             {userRole === "doctor" ? (
//               <form
//                 onSubmit={handleCommentSubmit}
//                 className="mt-6 space-y-4 bg-teal-50 p-4 rounded-lg shadow-inner"
//               >
//                 <div>
//                   <label
//                     htmlFor="newComment"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Add Comment/Treatment Advice{" "}
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     id="newComment"
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     placeholder="Enter your comment or treatment advice..."
//                     className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-y"
//                     rows="4"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="testResultImage"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Upload Test Result Image (Optional)
//                   </label>
//                   <input
//                     id="testResultImage"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200"
//                   />
//                   {testResultImage && (
//                     <p className="mt-1 text-sm text-gray-600">
//                       Selected: {testResultImage.name}
//                     </p>
//                   )}
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={commentLoading}
//                   className={`w-full sm:w-auto bg-teal-600 text-white text-sm font-semibold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-md transition duration-300 ${
//                     commentLoading
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:bg-teal-700"
//                   }`}
//                 >
//                   {commentLoading ? "Submitting..." : "Submit Comment"}
//                 </button>
//               </form>
//             ) : (
//               <p className="mt-4 text-sm text-gray-500 italic">
//                 Only doctors can add comments. Your role is: {userRole}
//               </p>
//             )}
//           </Section>
//         </div>
//       </div>

//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 print:hidden">
//           <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-gray-800">Image Preview</h2>
//               <button
//                 onClick={closeImageModal}
//                 className="text-gray-600 hover:text-gray-800 focus:outline-none"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <img
//               src={selectedImage}
//               alt="Full-size preview"
//               className="w-full h-auto max-h-[70vh] object-contain rounded"
//             />
//           </div>
//         </div>
//       )}

//       <style>{`
//         @media print {
//           .print\\:hidden {
//             display: none;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// const Section = ({ title, children, bgColor, borderColor }) => (
//   <div
//     className={`p-4 rounded-lg shadow-md ${bgColor} border-2 ${borderColor}`}
//   >
//     <h2 className="text-xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text">
//       {title}
//     </h2>
//     {children}
//   </div>
// );

// const Field = ({ label, value, highlight }) => (
//   <div className="flex flex-col sm:flex-row sm:items-center py-2">
//     <span className="text-sm font-semibold text-gray-700 sm:w-1/3">
//       {label}:
//     </span>
//     <span
//       className={`text-sm sm:w-2/3 mt-1 sm:mt-0 p-2 rounded ${
//         highlight
//           ? "bg-red-200 text-red-800 font-bold"
//           : "bg-gray-50 text-gray-900"
//       }`}
//     >
//       {value}
//     </span>
//   </div>
// );

// export default PatientReport;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";

const PatientReport = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [testResultImage, setTestResultImage] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view this report.");
      toast.error("Please log in to view this report.");
      setLoading(false);
      return;
    }

    try {
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        throw new Error("Invalid JWT format");
      }
      const decodedPayload = JSON.parse(atob(tokenParts[1]));
      const role = decodedPayload.role || "unknown";
      const id =
        decodedPayload.id ||
        decodedPayload.sub ||
        decodedPayload._id ||
        decodedPayload.userId ||
        null;
      setUserRole(role);
      setUserId(id);
    } catch (err) {
      setError("Invalid token format. Please log in again.");
      toast.error("Invalid token format. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchPatientAndComments = async () => {
      try {
        const patientResponse = await axios.get(
          `http://localhost:8080/api/v1/patients/patient/${patientId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPatient(patientResponse.data.data || null);

        const commentsResponse = await axios.get(
          `http://localhost:8080/api/v1/comments/patient/${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComments(commentsResponse.data.data || []);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          "Failed to fetch patient details or comments.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientAndComments();
  }, [patientId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || !newComment.trim()) {
      toast.error(
        !token ? "Please log in to add a comment." : "Comment is required."
      );
      return;
    }

    setCommentLoading(true);
    const formData = new FormData();
    formData.append("comment", newComment.trim());
    if (testResultImage) formData.append("testResultImage", testResultImage);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/comments/add-comment/${patientId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([...comments, response.data.data]);
      setNewComment("");
      setTestResultImage(null);
      toast.success("Comment added successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment.");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to delete a comment.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await axios.delete(
          `http://localhost:8080/api/v1/comments/delete-comment/${commentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setComments(comments.filter((comment) => comment._id !== commentId));
        toast.success("Comment deleted successfully!");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete comment.");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      setTestResultImage(null);
    } else {
      setTestResultImage(file);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const usableWidth = pageWidth - 2 * margin;
    const primaryColor = [0, 102, 204];
    const textColor = [40, 40, 40];
    const accentColor = [200, 200, 200];
    let y = margin;

    const addHeader = () => {
      doc.setFillColor(230, 240, 255);
      doc.rect(0, 0, pageWidth, 25, "F");
      doc.setFontSize(16);
      doc.setTextColor(...primaryColor);
      doc.setFont("helvetica", "bold");
      doc.text("Patient Report", pageWidth / 2, 10, { align: "center" });
      doc.setFontSize(12);
      doc.text(`${patient.firstName} ${patient.lastName}`, pageWidth / 2, 20, {
        align: "center",
      });
      doc.setDrawColor(...primaryColor);
      doc.setLineWidth(0.4);
      doc.line(margin, 25, pageWidth - margin, 25);
      y = 30;
    };

    const addFooter = () => {
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Generated By:Care Plus | Date: ${new Date().toLocaleDateString()} | Page ${
          doc.internal.getCurrentPageInfo().pageNumber
        }`,
        pageWidth / 2,
        pageHeight - 5,
        { align: "center" }
      );
      doc.setDrawColor(...accentColor);
      doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);
    };

    const checkPageBreak = (requiredHeight) => {
      if (pageHeight - y - 15 < requiredHeight) {
        addFooter();
        doc.addPage();
        addHeader();
      }
    };

    const addSection = (title, fields, includeImages = false, images = []) => {
      const lineHeight = 6;
      const sectionHeaderHeight = 12;
      let sectionHeight =
        sectionHeaderHeight + fields.length * (lineHeight + 2);
      if (includeImages) sectionHeight += images.length * 45;

      checkPageBreak(sectionHeight);

      doc.setFontSize(12);
      doc.setTextColor(...primaryColor);
      doc.setFont("helvetica", "bold");
      doc.text(title, margin, y);
      doc.setDrawColor(...primaryColor);
      doc.line(margin, y + 1, margin + usableWidth, y + 1);
      y += sectionHeaderHeight;

      doc.setFontSize(9);
      doc.setTextColor(...textColor);
      doc.setFont("helvetica", "light");
      fields.forEach(({ label, value }) => {
        const wrappedLabel = doc.splitTextToSize(`${label}`, usableWidth / 2);
        const wrappedValue = doc.splitTextToSize(
          `${value || ""}`,
          usableWidth / 2
        );
        const fieldHeight =
          Math.max(wrappedLabel.length, wrappedValue.length) * lineHeight;
        checkPageBreak(fieldHeight + 5);

        doc.text(wrappedLabel, margin, y);
        doc.text(wrappedValue, margin + usableWidth / 2, y);
        y += fieldHeight + 2;
      });

      if (includeImages && images.length > 0) {
        y += 5;
        images.forEach((imageUrl, index) => {
          checkPageBreak(45);
          try {
            doc.addImage(
              imageUrl,
              "JPEG",
              margin,
              y,
              60,
              35,
              undefined,
              "FAST"
            );
            doc.setDrawColor(...accentColor);
            doc.rect(margin, y, 60, 35);
            doc.setFontSize(8);
            doc.text(`Image ${index + 1}`, margin, y + 40);
            y += 45;
          } catch (err) {
            doc.text(`[Image ${index + 1} unavailable]`, margin, y);
            y += 10;
          }
        });
      }
      y += 10;
    };

    addHeader();

    addSection("Personal Information", [
      { label: "First Name:", value: patient.firstName },
      { label: "Last Name:", value: patient.lastName },
      {
        label: "Date of Birth:",
        value: new Date(patient.dateOfBirth).toLocaleDateString(),
      },
      { label: "Gender:", value: patient.gender },
      { label: "Height:", value: patient.height || "N/A" },
      { label: "Weight:", value: patient.weight || "N/A" },
      { label: "Marital Status:", value: patient.maritalStatus },
    ]);

    addSection("Contact Information", [
      { label: "Contact Number:", value: patient.contactNumber },
      { label: "Email:", value: patient.email },
      { label: "Address:", value: patient.address },
    ]);

    addSection("Emergency Contact", [
      { label: "Name:", value: patient.emergencyContactName },
      { label: "Number:", value: patient.emergencyContactNumber },
    ]);

    addSection("Medical Information", [
      {
        label: "Taking Medications:",
        value: patient.takingMedications ? "Yes" : "No",
      },
      {
        label: "Current Medications:",
        value: patient.currentMedications || "None",
      },
      { label: "Reason for Visit:", value: patient.reasonForVisit },
      { label: "Allergies:", value: patient.allergies || "None" },
    ]);

    addSection("Lifestyle Factors", [
      { label: "Smoke:", value: patient.smoke ? "Yes" : "No" },
      { label: "Cigarettes Per Day:", value: patient.cigarettesPerDay || "0" },
      { label: "Alcohol Daily:", value: patient.alcoholDaily ? "Yes" : "No" },
      { label: "Alcohol Weekly:", value: patient.alcoholWeekly ? "Yes" : "No" },
      {
        label: "Alcohol Monthly:",
        value: patient.alcoholMonthly ? "Yes" : "No",
      },
      {
        label: "Alcohol Occasionally:",
        value: patient.alcoholOccasionally ? "Yes" : "No",
      },
      { label: "Alcohol Never:", value: patient.alcoholNever ? "Yes" : "No" },
      { label: "Exercise:", value: patient.exercise || "None" },
    ]);

    addSection("Medical History", [
      { label: "Anemia:", value: patient.anemia ? "Yes" : "No" },
      { label: "Asthma:", value: patient.asthma ? "Yes" : "No" },
      { label: "Arthritis:", value: patient.arthritis ? "Yes" : "No" },
      { label: "Cancer:", value: patient.cancer ? "Yes" : "No" },
      { label: "Diabetes:", value: patient.diabetes ? "Yes" : "No" },
      { label: "Gallstones:", value: patient.Gallstones ? "Yes" : "No" },
      { label: "Heart Disease:", value: patient.heartDisease ? "Yes" : "No" },
      { label: "Heart Attack:", value: patient.heartAttack ? "Yes" : "No" },
      {
        label: "High Blood Pressure:",
        value: patient.highBloodPressure ? "Yes" : "No",
      },
      {
        label: "Digestive Problems:",
        value: patient.digestiveProblems ? "Yes" : "No",
      },
      { label: "Hepatitis:", value: patient.hepatitis ? "Yes" : "No" },
      { label: "Kidney Disease:", value: patient.kidneyDisease ? "Yes" : "No" },
      {
        label: "Thyroid Problems:",
        value: patient.thyroidProblems ? "Yes" : "No",
      },
      { label: "Lung Disease:", value: patient.lungDisease ? "Yes" : "No" },
      {
        label: "Bleeding Disorder:",
        value: patient.bleedingDisorder ? "Yes" : "No",
      },
      { label: "Other Illnesses:", value: patient.OtherIllnesses || "None" },
      {
        label: "Family Health History:",
        value: patient.familyHealthHistory || "None",
      },
      { label: "Other Comments:", value: patient.otherComments || "None" },
    ]);

    // Removed "Patient Prescription/Report Images" section from PDF

    if (comments.length > 0) {
      const commentFields = comments.map((comment, index) => ({
        label: `Comment ${index + 1} by ${
          comment.createdBy?.name || "Doctor"
        } (${new Date(comment.createdAt).toLocaleDateString()}):`,
        value: comment.comment,
      }));
      const commentImages = comments
        .filter((c) => c.testResultImage)
        .map((c) => c.testResultImage);
      addSection(
        "Doctor's Comments/Treatment Advice",
        commentFields,
        true,
        commentImages
      );
    }

    addFooter();
    doc.save(`${patient.firstName}_${patient.lastName}_Report.pdf`);
  };

  const printReport = () => window.print();

  const openImageModal = (imageUrl) => setSelectedImage(imageUrl);
  const closeImageModal = () => setSelectedImage(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <p className="text-lg text-gray-700 animate-pulse">
          Loading patient report...
        </p>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="bg-red-200 p-6 rounded-lg text-red-800 max-w-md text-center shadow-lg">
          {error || "Patient data not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 py-6 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border-4 border-indigo-400">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
            Patient Report: {patient.firstName} {patient.lastName}
          </h1>
          <div className="mt-4 sm:mt-0 flex space-x-4 print:hidden">
            <button
              onClick={printReport}
              className="bg-green-500 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition duration-300"
            >
              Print Report
            </button>
            <button
              onClick={downloadPDF}
              className="bg-indigo-600 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition duration-300"
            >
              Download Report
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <Section
            title="Personal Information"
            bgColor="bg-blue-100"
            borderColor="border-blue-300"
          >
            <Field label="First Name" value={patient.firstName} />
            <Field label="Last Name" value={patient.lastName} />
            <Field
              label="Date of Birth"
              value={new Date(patient.dateOfBirth).toLocaleDateString()}
            />
            <Field label="Gender" value={patient.gender} />
            <Field label="Height" value={patient.height || "N/A"} />
            <Field label="Weight" value={patient.weight || "N/A"} />
            <Field label="Marital Status" value={patient.maritalStatus} />
          </Section>

          <Section
            title="Contact Information"
            bgColor="bg-green-100"
            borderColor="border-green-300"
          >
            <Field label="Contact Number" value={patient.contactNumber} />
            <Field label="Email" value={patient.email} />
            <Field label="Address" value={patient.address} />
          </Section>

          <Section
            title="Emergency Contact"
            bgColor="bg-yellow-100"
            borderColor="border-yellow-300"
          >
            <Field label="Name" value={patient.emergencyContactName} />
            <Field label="Number" value={patient.emergencyContactNumber} />
          </Section>

          <Section
            title="Medical Information"
            bgColor="bg-pink-100"
            borderColor="border-pink-300"
          >
            <Field
              label="Taking Medications"
              value={patient.takingMedications ? "Yes" : "No"}
            />
            <Field
              label="Current Medications"
              value={patient.currentMedications || "None"}
            />
            <Field label="Reason for Visit" value={patient.reasonForVisit} />
            <Field label="Allergies" value={patient.allergies || "None"} />
          </Section>

          <Section
            title="Lifestyle Factors"
            bgColor="bg-yellow-50"
            borderColor="border-yellow-200"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Smoke"
                value={patient.smoke ? "Yes" : "No"}
                highlight={patient.smoke}
              />
              <Field
                label="Cigarettes Per Day"
                value={patient.cigarettesPerDay || "0"}
              />
              <Field
                label="Alcohol Daily"
                value={patient.alcoholDaily ? "Yes" : "No"}
                highlight={patient.alcoholDaily}
              />
              <Field
                label="Alcohol Weekly"
                value={patient.alcoholWeekly ? "Yes" : "No"}
                highlight={patient.alcoholWeekly}
              />
              <Field
                label="Alcohol Monthly"
                value={patient.alcoholMonthly ? "Yes" : "No"}
                highlight={patient.alcoholMonthly}
              />
              <Field
                label="Alcohol Occasionally"
                value={patient.alcoholOccasionally ? "Yes" : "No"}
                highlight={patient.alcoholOccasionally}
              />
              <Field
                label="Alcohol Never"
                value={patient.alcoholNever ? "Yes" : "No"}
                highlight={patient.alcoholNever}
              />
              <Field label="Exercise" value={patient.exercise || "None"} />
            </div>
          </Section>

          <Section
            title="Medical History"
            bgColor="bg-purple-100"
            borderColor="border-purple-300"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Anemia"
                value={patient.anemia ? "Yes" : "No"}
                highlight={patient.anemia}
              />
              <Field
                label="Asthma"
                value={patient.asthma ? "Yes" : "No"}
                highlight={patient.asthma}
              />
              <Field
                label="Arthritis"
                value={patient.arthritis ? "Yes" : "No"}
                highlight={patient.arthritis}
              />
              <Field
                label="Cancer"
                value={patient.cancer ? "Yes" : "No"}
                highlight={patient.cancer}
              />
              <Field
                label="Diabetes"
                value={patient.diabetes ? "Yes" : "No"}
                highlight={patient.diabetes}
              />
              <Field
                label="Gallstones"
                value={patient.Gallstones ? "Yes" : "No"}
                highlight={patient.Gallstones}
              />
              <Field
                label="Heart Disease"
                value={patient.heartDisease ? "Yes" : "No"}
                highlight={patient.heartDisease}
              />
              <Field
                label="Heart Attack"
                value={patient.heartAttack ? "Yes" : "No"}
                highlight={patient.heartAttack}
              />
              <Field
                label="High Blood Pressure"
                value={patient.highBloodPressure ? "Yes" : "No"}
                highlight={patient.highBloodPressure}
              />
              <Field
                label="Digestive Problems"
                value={patient.digestiveProblems ? "Yes" : "No"}
                highlight={patient.digestiveProblems}
              />
              <Field
                label="Hepatitis"
                value={patient.hepatitis ? "Yes" : "No"}
                highlight={patient.hepatitis}
              />
              <Field
                label="Kidney Disease"
                value={patient.kidneyDisease ? "Yes" : "No"}
                highlight={patient.kidneyDisease}
              />
              <Field
                label="Thyroid Problems"
                value={patient.thyroidProblems ? "Yes" : "No"}
                highlight={patient.thyroidProblems}
              />
              <Field
                label="Lung Disease"
                value={patient.lungDisease ? "Yes" : "No"}
                highlight={patient.lungDisease}
              />
              <Field
                label="Bleeding Disorder"
                value={patient.bleedingDisorder ? "Yes" : "No"}
                highlight={patient.bleedingDisorder}
              />
            </div>
            <Field
              label="Other Illnesses"
              value={patient.OtherIllnesses || "None"}
            />
            <Field
              label="Family Health History"
              value={patient.familyHealthHistory || "None"}
            />
            <Field
              label="Other Comments"
              value={patient.otherComments || "None"}
            />
          </Section>

          <Section
            title="Patient Prescription/Report Images"
            bgColor="bg-orange-100"
            borderColor="border-orange-300"
          >
            {patient.prescriptionOrReportImages?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {patient.prescriptionOrReportImages
                  .slice(0, 4)
                  .map((image, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <img
                        src={image}
                        alt={`Prescription/Report ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => openImageModal(image)}
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        Image {index + 1}
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                No prescription or report images available.
              </p>
            )}
          </Section>

          <Section
            title="Doctor's Comments/Treatment Advice"
            bgColor="bg-teal-100"
            borderColor="border-teal-300"
          >
            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment, index) => {
                  const createdById =
                    comment.createdBy?._id ||
                    comment.createdBy?.id ||
                    comment.createdBy?.userId;
                  const canDelete =
                    userRole === "doctor" && userId && userId === createdById;
                  return (
                    <div key={index} className="border-b border-teal-200 pb-2">
                      <p className="text-sm font-semibold text-gray-700">
                        {comment.createdBy?.name || "Doctor"} (
                        {new Date(comment.createdAt).toLocaleDateString()})
                      </p>
                      <p className="text-sm text-gray-900 mt-1">
                        {comment.comment}
                      </p>
                      {comment.testResultImage && (
                        <img
                          src={comment.testResultImage}
                          alt={`Test Result ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-md mt-2 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() =>
                            openImageModal(comment.testResultImage)
                          }
                        />
                      )}
                      {canDelete && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="mt-4 mb-4 py-1 px-4 text-sm font-semibold text-[crimson] hover:text-red-700 focus:outline-none"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-600">No comments yet.</p>
            )}

            {userRole === "doctor" ? (
              <form
                onSubmit={handleCommentSubmit}
                className="mt-6 space-y-4 bg-teal-50 p-4 rounded-lg shadow-inner"
              >
                <div>
                  <label
                    htmlFor="newComment"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Add Comment/Treatment Advice{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="newComment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Enter your comment or treatment advice..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-y"
                    rows="4"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="testResultImage"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Upload Test Result Image (Optional)
                  </label>
                  <input
                    id="testResultImage"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200"
                  />
                  {testResultImage && (
                    <p className="mt-1 text-sm text-gray-600">
                      Selected: {testResultImage.name}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={commentLoading}
                  className={`w-full sm:w-auto bg-teal-600 text-white text-sm font-semibold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-md transition duration-300 ${
                    commentLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-teal-700"
                  }`}
                >
                  {commentLoading ? "Submitting..." : "Submit Comment"}
                </button>
              </form>
            ) : (
              <p className="mt-4 text-sm text-gray-500 italic">
                Only doctors can add comments. Your role is: {userRole}
              </p>
            )}
          </Section>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 print:hidden">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Image Preview</h2>
              <button
                onClick={closeImageModal}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
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
            <img
              src={selectedImage}
              alt="Full-size preview"
              className="w-full h-auto max-h-[70vh] object-contain rounded"
            />
          </div>
        </div>
      )}

      <style>{`
        @media print {
          .print\\:hidden {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

const Section = ({ title, children, bgColor, borderColor }) => (
  <div
    className={`p-4 rounded-lg shadow-md ${bgColor} border-2 ${borderColor}`}
  >
    <h2 className="text-xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text">
      {title}
    </h2>
    {children}
  </div>
);

const Field = ({ label, value, highlight }) => (
  <div className="flex flex-col sm:flex-row sm:items-center py-2">
    <span className="text-sm font-semibold text-gray-700 sm:w-1/3">
      {label}:
    </span>
    <span
      className={`text-sm sm:w-2/3 mt-1 sm:mt-0 p-2 rounded ${
        highlight
          ? "bg-red-200 text-red-800 font-bold"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {value}
    </span>
  </div>
);

export default PatientReport;
