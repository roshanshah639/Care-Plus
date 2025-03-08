import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyAccount,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

// router config
const router = Router();

// register user
router.route("/register").post(registerUser);

// verify account
router.route("/verify-account").post(verifyAccount);

// login route
router.route("/login").post(loginUser);

// logout user
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
