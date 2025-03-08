export const DB_NAME = "patient-record-app";

export const cookieOptions = {
  httpOnly: true, // 🔹 Prevents access from JavaScript (More Secure)
  secure: process.env.NODE_ENV === "production", // 🔹 Secure in production
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 🔹 "none" if cross-origin, otherwise "lax"
};
