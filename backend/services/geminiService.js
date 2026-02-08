const axios = require("axios");

async function rewriteWithAI(prompt) {
  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
    {
      contents: [
        {
          parts: [
            {
              text: `You are a professional resume writer.\n\n${prompt}`
            }
          ]
        }
      ]
    },
    {
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        key: process.env.GEMINI_API_KEY
      }
    }
  );

  return response.data.candidates[0].content.parts[0].text;
}

module.exports = { rewriteWithAI };
