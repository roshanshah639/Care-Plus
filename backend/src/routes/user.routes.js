import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getUser,
  updateUserAccountDetails,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

// router config
const router = Router();

// get user
router.route("/user").get(verifyJWT, getUser);

// update user account details
router
  .route("/user/update-details")
  .patch(verifyJWT, upload.single("avatar"), updateUserAccountDetails);

export default router;
