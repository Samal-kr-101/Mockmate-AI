import Interview from "../models/Interview.js";
import Question from "../models/Question.js";

import { evaluateAnswer }
from "../services/evaluateAnswer.js";

import { generateFollowupQuestion }
from "../services/aiService.js";


// ============================
// START INTERVIEW SESSION
// ============================
export const startInterviewSession =
async (req, res) => {

  try {

    const { id } = req.params;

    const interview =
      await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    const questions =
      await Question.find({
        interview: id,
      }).sort({
        order: 1,
      });

    if (!questions.length) {
      return res.status(400).json({
        message:
          "No questions found",
      });
    }

    interview.currentQuestionIndex = 0;
    interview.isCompleted = false;
    interview.totalScore = 0;

    await interview.save();

    return res.json({
  interviewId: id,
  question: questions[0],
  totalQuestions: interview.totalQuestions,
  currentQuestion: 1,
});

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }
};


// ============================
// SUBMIT ANSWER
// ============================
export const submitAnswer =
async (req, res) => {

  try {

    const {
      interviewId,
      questionId,
      answer,
    } = req.body;

    if (
      !interviewId ||
      !questionId ||
      !answer
    ) {
      return res.status(400).json({
        message:
          "Missing required fields",
      });
    }

    const interview =
      await Interview.findById(
        interviewId
      );

    if (!interview) {
      return res.status(404).json({
        message:
          "Interview not found",
      });
    }

    const question =
      await Question.findById(
        questionId
      );

    if (!question) {
      return res.status(404).json({
        message:
          "Question not found",
      });
    }

    // ====================
    // Evaluate Answer
    // ====================

    const evaluation =
      await evaluateAnswer(
        question.question,
        answer
      );

    question.candidateAnswer =
      answer;

    question.score =
      evaluation.score;

    question.feedback =
      evaluation.feedback;

    await question.save();

    interview.totalScore +=
      evaluation.score;

    interview.currentQuestionIndex +=
      1;

    // ====================
    // Interview Finished
    // ====================

    if (
      interview.currentQuestionIndex >=
      interview.totalQuestions
    ) {

      interview.isCompleted = true;

      await interview.save();

      return res.json({
        completed: true,
        evaluation,
        totalScore:
          interview.totalScore,
      });
    }

    // ====================
    // Generate Follow-Up
    // ====================

    const nextQuestionAI =
      await generateFollowupQuestion(
        question.question,
        answer,
        interview.selectedRole,
        interview.difficulty
      );

    const nextQuestion =
      await Question.create({
        interview:
          interviewId,

        question:
          nextQuestionAI.question,

        order:
          interview.currentQuestionIndex,
      });

    await interview.save();

    return res.json({
  completed: false,

  evaluation,

  nextQuestion,

  currentQuestion:
    interview.currentQuestionIndex + 1,

  totalQuestions:
    interview.totalQuestions,
});

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }
};