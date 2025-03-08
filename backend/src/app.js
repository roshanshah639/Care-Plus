import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";

// app config
const app = express();

// cors config
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// common middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
// static files
app.use(express.static("public"));
// cookie parser
app.use(cookieParser());

// routes import
import healthcheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import patientRouter from "./routes/patient.routes.js";
import commentRouter from "./routes/comment.routes.js";

// routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/patients", patientRouter);
app.use("/api/v1/comments", commentRouter);

// error handler
app.use(errorHandler);

export { app };
