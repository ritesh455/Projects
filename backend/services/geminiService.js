// const axios = require("axios");

// const GEMINI_MODEL = "gemini-2.5-flash"; 
// // 🔁 later change to "gemini-2.5-xxx" when officially released

// async function rewriteWithAI(prompt, retries = 2) {
//   try {
//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent`,
//       {
//         contents: [{ parts: [{ text: prompt }] }],
//       },
//       {
//         headers: { "Content-Type": "application/json" },
//         params: { key: process.env.GEMINI_API_KEY },
//       }
//     );

//     return response.data.candidates?.[0]?.content?.parts?.[0]?.text;
//   } catch (error) {
//     if (
//       retries > 0 &&
//       error.response?.status === 429
//     ) {
//       console.warn("Gemini busy, retrying...");
//       await new Promise((res) => setTimeout(res, 1500));
//       return rewriteWithAI(prompt, retries - 1);
//     }

//     throw error;
//   }
// }

// module.exports = { rewriteWithAI };



require("dotenv").config();
const axios = require("axios");

const GROQ_MODEL = "llama-3.1-8b-instant";

async function rewriteWithAI(prompt, retries = 2) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: GROQ_MODEL,
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    return response.data.choices?.[0]?.message?.content;
  } catch (error) {
    if (retries > 0 && error.response?.status === 429) {
      console.warn("Groq busy, retrying...");
      await new Promise(res => setTimeout(res, 1500));
      return rewriteWithAI(prompt, retries - 1);
    }

    console.error(error.response?.data);
    throw error;
  }
}

module.exports = { rewriteWithAI };
