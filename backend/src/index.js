import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/connectDb.js";

// load env. variables
dotenv.config({ path: "./.env" });

// server config
const PORT = process.env.PORT || 4000;

// connect to db
connectDB()
  .then(() => {
    // listen for error
    app.on("error", (error) => {
      console.log("Server is not able to talk to DB", error);
    });

    // start server
    app.listen(PORT, () => {
      console.log(`Server Is Running At: http://localhost:${PORT}...`);
    });
  })
  .catch((error) => {
    console.log("DB Connection Error!", error);
  });
