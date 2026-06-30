import express from "express";
import cors from "cors";

import authRoutes
from "./routes/authRoutes.js";
import adminRoutes
from "./routes/adminRoutes.js";

import interviewRoutes
from "./routes/interviewRoutes.js";


const app = express();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use("/api/admin", adminRoutes);

app.use(
  "/api/interviews",
  interviewRoutes
);

app.get("/", (req, res) => {
  res.send("API Running");
});

export default app;