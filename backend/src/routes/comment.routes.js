import { Router } from "express";
import {
  verifyJWT,
  verifyAdminOrDoctor,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addComment,
  deleteComment,
  getCommentsByPatient,
} from "../controllers/comment.controller.js";

// router config
const router = Router();

// add comment route
router
  .route("/add-comment/:patientId")
  .post(
    verifyJWT,
    verifyAdminOrDoctor,
    upload.single("testResultImage"),
    addComment
  );

// get comments by id
router.route("/patient/:patientId").get(verifyJWT, getCommentsByPatient);

// delete comment
router
  .route("/delete-comment/:commentId")
  .delete(verifyJWT, verifyAdminOrDoctor, deleteComment);

export default router;
