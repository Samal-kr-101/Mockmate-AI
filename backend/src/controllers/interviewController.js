import Interview from "../models/Interview.js";
import Question from "../models/Question.js";

import {
  generateQuestions,
} from "../services/aiService.js";


// =====================================
// GENERATE QUESTIONS
// =====================================
export const generateInterviewQuestions = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    // Prevent duplicate questions
    const existingQuestions = await Question.find({
      interview: interview._id,
    }).sort({ order: 1 });

    if (existingQuestions.length > 0) {
      return res.json(existingQuestions);
    }

    // Generate AI Questions
    const questions = await generateQuestions(
      interview.selectedRole,
      interview.difficulty,
      interview.totalQuestions
    );

    const savedQuestions = [];

    for (let i = 0; i < questions.length; i++) {
      const question = await Question.create({
        interview: interview._id,
        question: questions[i].question,
        order: i, // Save question order
      });

      savedQuestions.push(question);
    }

    res.status(200).json(savedQuestions);

  } catch (error) {
    console.error("Generate Questions Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================================
// CREATE INTERVIEW
// =====================================
export const createInterview =
  async (req, res) => {
    try {
      const {
        selectedRole,
        difficulty,
        totalQuestions,
      } = req.body;

      const interview =
        await Interview.create({
          user:
            req.user.id,
          selectedRole,
          difficulty,
          totalQuestions,
        });

      res.status(201).json(
        interview
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };


// =====================================
// GET MY INTERVIEWS
// =====================================
export const getMyInterviews =
  async (req, res) => {
    try {
      const interviews =
        await Interview.find({
          user:
            req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.json(interviews);

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };


// =====================================
// GET INTERVIEW REPORT
// =====================================
export const getInterviewReport =
  async (req, res) => {
    try {
      const interview =
        await Interview.findById(
          req.params.id
        );

      if (!interview) {
        return res.status(404).json({
          message:
            "Interview not found",
        });
      }

      // Security Check
      if (
        interview.user.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          message:
            "Access denied",
        });
      }

      const questions =
        await Question.find({
          interview:
            interview._id,
        });

      res.json({
        interviewId:
          interview._id,
        selectedRole:
          interview.selectedRole,
        difficulty:
          interview.difficulty,
        totalQuestions:
          interview.totalQuestions,
        totalScore:
          interview.totalScore,
        status:
          interview.status,
        isCompleted:
          interview.isCompleted,
        questions,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };