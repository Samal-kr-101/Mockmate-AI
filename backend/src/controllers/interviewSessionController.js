import Interview from "../models/Interview.js";
import Question from "../models/Question.js";

import { evaluateAnswer } from "../services/evaluateAnswer.js";

// ============================
// START INTERVIEW SESSION
// ============================
export const startInterviewSession = async (req, res) => {
  console.log("🔥 interviewSessionController loaded");
  try {
    const { id } = req.params;  

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    const questions = await Question.find({
      interview: id,
    }).sort({
      order: 1,
    });

    if (!questions.length) {
      return res.status(400).json({
        message: "No questions found",
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
export const submitAnswer = async (req, res) => {
    console.log("🔥 submitAnswer API called");
  try {
    const {
      interviewId,
      questionId,
      answer,
    } = req.body;

    if (!interviewId || !questionId || !answer) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    // ==========================
    // Evaluate Answer
    // ==========================

    const evaluation = await evaluateAnswer(
      question.question,
      answer
    );

    question.candidateAnswer = answer;
    question.score = evaluation.score;
    question.feedback = evaluation.feedback;

    await question.save();

    interview.totalScore += evaluation.score;
    interview.currentQuestionIndex += 1;

    // ==========================
    // Get All Generated Questions
    // ==========================

    const questions = await Question.find({
      interview: interviewId,
    }).sort({ order: 1 });

    console.log("Current Index:", interview.currentQuestionIndex);
    console.log("Questions Count:", questions.length);

    // ==========================
    // Interview Finished
    // ==========================

    if (
      interview.currentQuestionIndex >= questions.length
    ) {
      interview.isCompleted = true;
      interview.status = "completed";

      await interview.save();

      return res.json({
        completed: true,
        evaluation,
        totalScore: interview.totalScore,
      });
    }

    // ==========================
    // Next Generated Question
    // ==========================

    const nextQuestion =
      questions[interview.currentQuestionIndex];

    console.log(
      "Next Question:",
      nextQuestion.question
    );

    await interview.save();

    return res.json({
      completed: false,
      evaluation,
      nextQuestion,
      currentQuestion:
        interview.currentQuestionIndex + 1,
      totalQuestions: questions.length,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};