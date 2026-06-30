import express from "express";
import cors from "cors";

import authRoutes
from "./routes/authRoutes.js";
import adminRoutes
from "./routes/adminRoutes.js";

import interviewRoutes
from "./routes/interviewRoutes.js";


const app = express();




const allowedOrigins = [
  "http://localhost:5173",
  "https://mockmate-ai-ruddy.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests from Postman, curl, etc.
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// app.use(cors({
//   origin: true,
//   credentials: true,
// }));


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