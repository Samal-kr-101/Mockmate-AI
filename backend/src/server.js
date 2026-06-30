import dotenv from "dotenv";
import path from "path";

// Force-load .env from correct absolute path
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

import connectDB from "./config/db.js";
import app from "./app.js";

// Connect DB AFTER env is loaded
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});