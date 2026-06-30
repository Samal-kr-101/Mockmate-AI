import Question from "../models/Question.js";
import { evaluateAnswer } from "../services/evaluateAnswer.js";

export const evaluateUserAnswer = async (req, res) => {
  try {
    const { questionId, answer } = req.body;

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    const result = await evaluateAnswer(
      question.question,
      answer
    );

    question.candidateAnswer = answer;
    question.score = result.score;
    question.feedback = result.feedback;

    await question.save();

    res.json({
      questionId,
      ...result,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};