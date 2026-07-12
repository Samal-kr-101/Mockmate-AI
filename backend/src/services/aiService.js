import { askAI } from "./openRouterService.js";

// =====================================
// GENERATE INTERVIEW QUESTIONS
// =====================================

export const generateQuestions = async (
  role,
  difficulty,
  totalQuestions
) => {
  try {
    const prompt = `
You are a senior technical interviewer.

Generate exactly ${totalQuestions} technical interview questions.

Role: ${role}
Difficulty: ${difficulty}

Rules:
1. Generate exactly ${totalQuestions} questions.
2. Questions should progress from basic to advanced.
3. Focus only on technical concepts.
4. Do NOT ask HR questions.
5. Do NOT generate follow-up questions.
6. Every question must be independent.
7. Return ONLY valid JSON.
8. Do not use markdown.

Example:

[
  {
    "question": "What is React?"
  },
  {
    "question": "Explain Virtual DOM."
  },
  {
    "question": "What are React Hooks?"
  }
]
`;

    const response = await askAI(prompt);

    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const questions = JSON.parse(cleaned);

    // Ensure correct number of questions
    return questions.slice(0, totalQuestions);

  } catch (error) {
    console.log("Question generation failed. Using fallback.");

    return createFallbackQuestions(role, totalQuestions);
  }
};

// =====================================
// FALLBACK QUESTIONS
// =====================================

function createFallbackQuestions(role, totalQuestions) {
  const commonQuestions = [
    `What is your experience with ${role}?`,
    `Explain one important concept of ${role}.`,
    `What are the advantages of ${role}?`,
    `What are the disadvantages of ${role}?`,
    `Explain the architecture used in ${role}.`,
    `How do you debug applications?`,
    `Explain a challenging bug you solved.`,
    `How do you optimize application performance?`,
    `Describe a project you built using ${role}.`,
    `What best practices do you follow while developing applications?`,
  ];

  return Array.from(
    { length: totalQuestions },
    (_, index) => ({
      question:
        commonQuestions[index % commonQuestions.length],
    })
  );
}