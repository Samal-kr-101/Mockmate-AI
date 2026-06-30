import { askAI } from "./openRouterService.js";


// =====================================
// GENERATE INITIAL QUESTIONS
// =====================================

export const generateQuestions = async (
  role,
  difficulty,
  totalQuestions
) => {
  try {

    const prompt = `
You are a senior technical interviewer.

Generate ${totalQuestions} interview questions for:

Role: ${role}
Difficulty: ${difficulty}

Rules:

1. Questions must be realistic.
2. Questions should progress from basic to advanced.
3. Focus on technical concepts.
4. Avoid generic HR questions.
5. Return ONLY JSON.
6. No markdown.

Format:

[
  {
    "question": "What is React?"
  }
]
`;

    const response =
      await askAI(prompt);

    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {

    console.log(
      "Question generation failed. Using fallback."
    );

    return createFallbackQuestions(
      role,
      totalQuestions
    );
  }
};


// =====================================
// GENERATE FOLLOW-UP QUESTION
// =====================================

export const generateFollowupQuestion = async (
  previousQuestion,
  candidateAnswer,
  role,
  difficulty
) => {

  try {

    const prompt = `
You are a senior technical interviewer at Google.

ROLE:
${role}

DIFFICULTY:
${difficulty}

PREVIOUS QUESTION:
${previousQuestion}

CANDIDATE ANSWER:
${candidateAnswer}

YOUR TASK:

Conduct a realistic technical interview.

INTERVIEW RULES:

1. Stay on the same topic when necessary.
2. If the answer is incorrect:
   - Ask another question from the same topic.
   - Verify the candidate's understanding.
3. If the answer is partially correct:
   - Ask a clarifying question.
4. If the answer is strong:
   - Go deeper technically.
5. Never switch topics randomly.
6. Never follow incorrect information.
7. Do not ask HR questions.
8. Ask only ONE question.
9. Question should feel natural and professional.

Examples:

Question:
Difference between let and var

Bad Answer:
React is a library

Good Follow-up:
What is variable scope in JavaScript?

NOT:
How does React work?

----------------------------

Question:
What is React?

Good Answer:
React uses a Virtual DOM.

Good Follow-up:
How does React reconciliation work?

----------------------------

Return ONLY JSON.

{
  "question":"..."
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
      "Follow-up generation failed."
    );

    return {
      question:
        "Can you explain that concept in more detail?"
    };
  }
};


// =====================================
// FALLBACK QUESTIONS
// =====================================

function createFallbackQuestions(
  role,
  totalQuestions
) {

  const commonQuestions = [

    `Tell me about your experience as a ${role}.`,

    `What projects have you built related to ${role}?`,

    `Explain a challenging problem you solved.`,

    `What technologies do you use most often?`,

    `How do you debug issues in your applications?`,

    `Explain a recent concept you learned.`,

    `What are some best practices you follow?`,

    `How do you improve application performance?`,

    `Describe a team project you worked on.`,

    `What would you improve in your last project?`
  ];

  return Array.from(
    {
      length: totalQuestions,
    },
    (_, index) => ({
      question:
        commonQuestions[
          index %
          commonQuestions.length
        ],
    })
  );
}