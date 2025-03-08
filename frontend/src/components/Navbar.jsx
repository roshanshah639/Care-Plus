import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import avatarPlaceholder from "../assets/usericon.png"; // Static fallback image
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState(avatarPlaceholder); // Default to fallback
  const navigate = useNavigate();

  // Function to check login status and fetch user data
  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      await fetchUserData(token); // Fetch user data if token exists
    } else {
      setIsLoggedIn(false);
      setUserAvatar(avatarPlaceholder); // Reset avatar if no token
    }
  };

  // Fetch user data from the API
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/users/user",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const userData = response.data;
      if (userData.success && userData.data?.avatar) {
        setUserAvatar(userData.data.avatar);
      } else {
        setUserAvatar(avatarPlaceholder);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserAvatar(avatarPlaceholder);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
        toast.error("Session expired. Please log in again.");
      }
    }
  };

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/logout",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setIsPopupOpen(false);
        setUserAvatar(avatarPlaceholder);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setIsPopupOpen(false);
        setUserAvatar(avatarPlaceholder);
        navigate("/login");
      }
      toast.error(error.response?.data?.message);
    }
  };

  // Check login status on mount and when location changes
  useEffect(() => {
    checkLoginStatus();
  }, [navigate]); // Re-run when navigation occurs

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isPopupOpen) setIsPopupOpen(false);
  };

  // Toggle popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Close popup when clicking outside
  const handleOutsideClick = (e) => {
    if (
      !e.target.closest(".avatar-container") &&
      !e.target.closest(".popup-menu")
    ) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isPopupOpen]);

  return (
    <nav className="bg-[#F7F8FA] shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-[#0072E5]">
                Care Plus
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-indigo-950 hover:text-[#0072E5] transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-indigo-950 hover:text-[#0072E5] transition duration-300"
            >
              Services
            </Link>
            <Link
              to="/doctors"
              className="text-indigo-950 hover:text-[#0072E5] transition duration-300"
            >
              Doctors
            </Link>
            <Link
              to="/about"
              className="text-indigo-950 hover:text-[#0072E5] transition duration-300"
            >
              About
            </Link>
            <Link
              to="/patients/add-patient"
              className="text-indigo-800 font-semibold text-sm bg-white hover:text-white hover:bg-[#0072E5] shadow-sm shadow-[#0072E5] transition duration-300 px-4 py-2 rounded-full border border-indigo-700"
            >
              Registration Form
            </Link>
          </div>

          {/* Desktop Login/Avatar */}
          <div className="hidden md:flex items-center relative">
            {isLoggedIn ? (
              <div className="relative avatar-container">
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full cursor-pointer object-cover border-2 border-[#0072E5]"
                  onClick={togglePopup}
                />
                {isPopupOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 popup-menu">
                    <Link
                      to="/users/user-profile"
                      className="block px-4 py-2 text-indigo-950 hover:bg-[#0072E5] hover:text-white transition duration-200"
                      onClick={() => setIsPopupOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/patients/view-records"
                      className="block px-4 py-2 text-indigo-950 hover:bg-[#0072E5] hover:text-white transition duration-200"
                      onClick={() => setIsPopupOpen(false)}
                    >
                      View Patient Records
                    </Link>
                    <Link
                      to="/patients/add-patient"
                      className="block px-4 py-2 text-indigo-950 hover:bg-[#0072E5] hover:text-white transition duration-200"
                      onClick={() => {
                        toggleMobileMenu();
                        setIsPopupOpen(false);
                      }}
                    >
                      Add Patient
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-indigo-950 hover:bg-[#0072E5] hover:text-white transition duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#0072E5] text-base text-white px-8 py-2 rounded hover:bg-indigo-700 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-indigo-950 hover:text-[#0072E5] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#F7F8FA] shadow-lg fixed top-16 right-0 h-screen w-64 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 pt-4 pb-8 space-y-4">
          <Link
            to="/"
            className="block text-indigo-950 hover:text-[#0072E5] transition duration-300"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/services"
            className="block text-indigo-950 hover:text-[#0072E5] transition duration-300"
            onClick={toggleMobileMenu}
          >
            Services
          </Link>
          <Link
            to="/doctors"
            className="block text-indigo-950 hover:text-[#0072E5] transition duration-300"
            onClick={toggleMobileMenu}
          >
            Doctors
          </Link>
          <Link
            to="/about"
            className="block text-indigo-950 hover:text-[#0072E5] transition duration-300"
            onClick={toggleMobileMenu}
          >
            About
          </Link>
          <Link
            to="/patients/add-patient"
            className="block w-[80%] text-indigo-950 bg-white hover:bg-[#0072E5] hover:text-white shadow-md shadow-indigo-600 transition duration-300 px-4 py-2 rounded-full"
            onClick={toggleMobileMenu}
          >
            Registration Form
          </Link>

          {/* Mobile Avatar/Logout */}
          {isLoggedIn ? (
            <div className="relative avatar-container">
              <img
                src={userAvatar}
                alt="User Avatar"
                className="h-10 w-10 rounded-full cursor-pointer object-cover border-2 border-[#0072E5]"
                onClick={togglePopup}
              />
              {isPopupOpen && (
                <div className="mt-2 w-full bg-white shadow-lg rounded-lg py-2 popup-menu">
                  <Link
                    to="/users/user-profile"
                    className="block px-4 py-2 text-indigo-950 hover:bg-[#0072E5] hover:text-white transition duration-200"
                    onClick={() => {
                      toggleMobileMenu();
                      setIsPopupOpen(false);
                    }}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/patients/view-records"
                    className="block px-4 py-2 text-indigo-950 hover:bg-[#0072E5] hover:text-white transition duration-200"
                    onClick={() => {
                      toggleMobileMenu();
                      setIsPopupOpen(false);
                    }}
                  >
                    View Patient Records
                  </Link>
                  <Link
                    to="/patients/add-patient"
                    className="block px-4 py-2 text-indigo-950 hover:bg-[#0072E5] hover:text-white transition duration-200"
                    onClick={() => {
                      toggleMobileMenu();
                      setIsPopupOpen(false);
                    }}
                  >
                    Add Patient
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="block w-full text-left px-4 py-2 text-indigo-950 hover:bg-[#0072E5] hover:text-white transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              onClick={toggleMobileMenu}
              className="block bg-[#0072E5] text-base text-white px-8 py-2 rounded hover:bg-indigo-700 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
