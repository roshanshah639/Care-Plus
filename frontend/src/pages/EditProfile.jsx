import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader2, User } from "lucide-react";
import userIcon from "../assets/usericon.png";

// EditProfile component for updating user profile details
const EditProfile = () => {
  const navigate = useNavigate();

  // State for form data (name, email, bio, avatar)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "", // Can be a URL (existing) or File (new upload)
  });

  // State for avatar preview and loading status
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/users/user`;
        console.log("Fetching user from:", apiUrl);

        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { success, data } = response.data;
        console.log("User data:", data);

        if (success && data) {
          const avatarUrl = data.avatar || userIcon;
          setFormData({
            name: data.name || "",
            email: data.email || "",
            bio: data.bio || "",
            avatar: data.avatar || "",
          });
          setAvatarPreview(avatarUrl);
        } else {
          toast.error("Failed to load user data");
        }
      } catch (error) {
        console.error("Fetch error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Error fetching profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle avatar file upload and preview
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result); // Preview the uploaded image
        setFormData((prev) => ({ ...prev, avatar: file })); // Store file
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit updated profile data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      // Prepare form data for multipart upload
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("bio", formData.bio);
      if (formData.avatar instanceof File) {
        formDataToSend.append("avatar", formData.avatar);
      }

      const apiUrl = `${
        import.meta.env.VITE_API_BASE_URL
      }/users/user/update-details`;
      console.log("Submitting to:", apiUrl);

      const response = await axios.patch(apiUrl, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        navigate("/users/user-profile");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Submit error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Render the component
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="w-[90%] md:w-[70%] xl:w-1/3 mx-auto mt-28 xl:mt-0 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-600 mb-6 text-center">
          Edit Profile
        </h1>

        {isLoading && !avatarPreview ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Avatar Display and Upload */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-4">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-full h-full rounded-full object-cover border-2 border-indigo-200"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-200">
                    <User className="w-12 h-12 text-indigo-400" />
                  </div>
                )}
                <label
                  htmlFor="avatar"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-sm cursor-pointer"
                >
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </label>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Bio Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center px-8 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-4" />
                    Saving Changes...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
