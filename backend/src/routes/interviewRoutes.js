import express from "express";

import authMiddleware
from "../middleware/authMiddleware.js";

import {
  createInterview,
  getMyInterviews,
  getInterviewReport
}
from "../controllers/interviewController.js";

import {
  startInterviewSession,
  submitAnswer,
} from "../controllers/interviewSessionController.js";

import { generateInterviewQuestions } from "../controllers/interviewController.js";
import { evaluateUserAnswer } from "../controllers/evaluationController.js";


const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createInterview
);

router.get(
  "/my",
  authMiddleware,
  getMyInterviews
);

router.get(
  "/:id/report",
  authMiddleware,
  getInterviewReport
);

router.post(
  "/:id/generate-questions",
  authMiddleware,
  generateInterviewQuestions
);

router.post("/evaluate-answer", evaluateUserAnswer);

router.post("/:id/start", startInterviewSession);
router.post("/submit-answer", submitAnswer);


export default router;