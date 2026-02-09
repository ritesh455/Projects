const axios = require("axios");

const GEMINI_MODEL = "gemini-2.5-flash"; 
// 🔁 later change to "gemini-2.5-xxx" when officially released

async function rewriteWithAI(prompt, retries = 2) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: process.env.GEMINI_API_KEY },
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    if (
      retries > 0 &&
      error.response?.status === 429
    ) {
      console.warn("Gemini busy, retrying...");
      await new Promise((res) => setTimeout(res, 1500));
      return rewriteWithAI(prompt, retries - 1);
    }

    throw error;
  }
}

module.exports = { rewriteWithAI };
