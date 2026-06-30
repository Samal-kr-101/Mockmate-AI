import { askAI } from "./openRouterService.js";

export const evaluateAnswer = async (
  question,
  answer
) => {
  try {

    const prompt = `
You are a strict technical interviewer.

QUESTION:
${question}

ANSWER:
${answer}

Evaluate the answer.

Return ONLY valid JSON.

Format:

{
  "score": 8,
  "feedback": "Good answer but missing details about virtual DOM.",
  "idealAnswer": "Ideal answer here."
}
`;

    const response =
      await askAI(prompt);

    const cleaned =
      response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned);

  } catch (error) {

    console.log(
      "OpenRouter evaluation failed. Using fallback."
    );

    let score = 5;

    if (answer.length > 20)
      score = 7;

    if (answer.length > 100)
      score = 8;

    return {
      score,
      feedback:
        "Fallback evaluation used because AI service is unavailable. Your answer appears relevant but could include more detail.",
      idealAnswer:
        "Provide a clear definition, explain core concepts, and give a practical example.",
    };
  }
};