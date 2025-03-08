// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import userIcon from "../assets/usericon.png";
// import { Link } from "react-router-dom";
// import { UserPen } from "lucide-react";

// const UserProfile = () => {
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/users/user`,
//           { withCredentials: true }
//         );

//         const data = response.data;

//         console.log(data);

//         if (data.success) {
//           setUser(data.data);
//         } else {
//           setError("Failed to load user data");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setError("Something went wrong while fetching profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Determine avatar source: use user.avatar if available, otherwise fall back to userIcon
//   const avatarSrc = user.avatar ? `${user.avatar}` : userIcon;

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div
//         className="max-w-md mx-auto bg-white shadow-sm shadow-indigo-400 rounded p-8 text-center transform transition-all
//         hover:shadow-md w-[80%] md min-h-[400px] duration-300"
//       >
//         <div className="text-sm mb-4 flex items-center justify-end">
//           <Link
//             to="/users/edit-profile"
//             className="flex items-center gap-2 px-4 py-2 text-xs text-[#7B2CF9]
//              hover:text-indigo-800 cursor-pointer rounded-full shadow-xs shadow-indigo-200"
//           >
//             <UserPen className="text-xs size-4" /> Update Profile
//           </Link>
//         </div>
//         {loading ? (
//           <div className="flex justify-center items-center min-h-[400px]">
//             <svg
//               className="animate-spin h-8 w-8 text-indigo-600"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               />
//             </svg>
//           </div>
//         ) : error ? (
//           <div className="text-red-600 min-h-[400px] flex items-center justify-center">
//             {error}
//           </div>
//         ) : (
//           <>
//             <img
//               src={avatarSrc}
//               alt="User Avatar"
//               className="w-28 h-28 rounded-full mx-auto border-4 border-indigo-100 shadow-md object-cover"
//               onError={(e) => (e.target.src = userIcon)}
//             />
//             <h2 className="text-2xl font-bold mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               {user.name || "Anonymous User"}
//             </h2>
//             <p className="text-gray-600 mt-2">
//               {user.email || "No email provided"}
//             </p>
//             <p className="text-gray-500 mt-3 italic">
//               {user.bio || `Hello, I'm ${user.name}`}
//             </p>
//             <span className="block mt-4 text-xs text-gray-400">
//               Registered On{" "}
//               {user.createdAt
//                 ? new Date(user.createdAt).toLocaleDateString()
//                 : "Unknown"}
//             </span>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
import axios from "axios";
import React, { useEffect, useState } from "react";
import userIcon from "../assets/usericon.png";
import { Link } from "react-router-dom";
import { UserPen } from "lucide-react";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        if (!token) {
          throw new Error("No token found in local storage");
        }

        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/users/user`;
        console.log("Fetching from:", apiUrl);
        console.log("Token:", token);

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in header
          },
        });

        const data = response.data;
        console.log("Response data:", data);

        if (data.success) {
          setUser(data.data);
        } else {
          setError("Failed to load user data");
        }
      } catch (error) {
        console.error(
          "Error details:",
          error.response?.status,
          error.response?.data || error.message
        );
        setError("Something went wrong while fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const avatarSrc = user.avatar ? `${user.avatar}` : userIcon;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div
        className="max-w-md mx-auto bg-white shadow-sm shadow-indigo-400 rounded p-8 text-center transform transition-all
        hover:shadow-md w-[80%] md min-h-[400px] duration-300"
      >
        <div className="text-sm mb-4 flex items-center justify-end">
          <Link
            to="/users/edit-profile"
            className="flex items-center gap-2 px-4 py-2 text-xs text-[#7B2CF9]
             hover:text-indigo-800 cursor-pointer rounded-full shadow-xs shadow-indigo-200"
          >
            <UserPen className="text-xs size-4" /> Update Profile
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <svg
              className="animate-spin h-8 w-8 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        ) : error ? (
          <div className="text-red-600 min-h-[400px] flex items-center justify-center">
            {error}
          </div>
        ) : (
          <>
            <img
              src={avatarSrc}
              alt="User Avatar"
              className="w-28 h-28 rounded-full mx-auto border-4 border-indigo-100 shadow-md object-cover"
              onError={(e) => (e.target.src = userIcon)}
            />
            <h2 className="text-2xl font-bold mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {user.name || "Anonymous User"}
            </h2>
            <p className="text-gray-600 mt-2">
              {user.email || "No email provided"}
            </p>
            <p className="text-gray-500 mt-3 italic">
              {user.bio || `Hello, I'm ${user.name}`}
            </p>
            <span className="block mt-4 text-xs text-gray-400">
              Registered On{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Unknown"}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
