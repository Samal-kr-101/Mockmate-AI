import axios from "axios";

const OPENROUTER_URL =
  "https://openrouter.ai/api/v1/chat/completions";

const MODEL =
  "deepseek/deepseek-chat";

export const askAI = async (prompt) => {
  try {
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0]
      .message.content;

  } catch (error) {

    console.error(
      "OpenRouter Error:",
      error.response?.data ||
      error.message
    );

    throw error;
  }
};